"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { capEndpoint } from "@/lib/cap";
import { isValidEmail } from "@/lib/email";
import { submitWaitlist } from "@/lib/waitlist";
import styles from "./WaitlistForm.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["comingSoon"]["waitlist"];
};

export default function WaitlistForm({ locale, t }: Props) {
  const [widgetKey, setWidgetKey] = useState(0);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);

  useEffect(() => {
    void import("cap-widget");
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      setStatus("error");
      setEmailInvalid(true);
      setMessage(t.emailError);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const capToken = String(formData.get("cap-token") ?? "").trim();

    if (!capToken) {
      setStatus("error");
      setEmailInvalid(false);
      setMessage(t.captchaError);
      return;
    }

    setStatus("loading");
    setMessage("");
    setEmailInvalid(false);

    const result = await submitWaitlist(trimmedEmail, locale, capToken);

    if (result.ok) {
      setStatus("success");
      setMessage(result.existing ? t.duplicate : t.success);
      setEmail("");
      setWidgetKey((key) => key + 1);
      return;
    }

    setStatus("error");
    if (result.reason === "captcha") {
      setMessage(t.captchaError);
    } else if (result.reason === "invalid") {
      setEmailInvalid(true);
      setMessage(t.emailError);
    } else {
      setMessage(t.error);
    }
    setWidgetKey((key) => key + 1);
  }

  return (
    <aside className={styles.card} aria-labelledby="waitlist-title">
      <div className={styles.head}>
        <h2 id="waitlist-title" className={styles.title}>
          {t.title}
        </h2>
        <p className={styles.lead}>{t.lead}</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="waitlist-email">
            {t.emailLabel}
          </label>
          <input
            id="waitlist-email"
            className={`${styles.input} ${emailInvalid ? styles.inputInvalid : ""}`}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            placeholder={t.emailPlaceholder}
            onChange={(event) => {
              setEmail(event.target.value);
              if (emailInvalid) {
                setEmailInvalid(false);
                if (status === "error") {
                  setStatus("idle");
                  setMessage("");
                }
              }
            }}
            disabled={status === "loading"}
            aria-invalid={emailInvalid}
            aria-describedby={message && emailInvalid ? "waitlist-email-error" : undefined}
          />
        </div>

        <div className={styles.captcha}>
          <cap-widget
            key={widgetKey}
            required
            data-cap-api-endpoint={capEndpoint()}
          />
        </div>

        <button
          type="submit"
          className={`btn btnPrimary ${styles.submit}`}
          disabled={status === "loading"}
        >
          {t.submit}
        </button>

        {message ? (
          <p
            id={emailInvalid ? "waitlist-email-error" : undefined}
            className={`${styles.message} ${
              status === "success" ? styles.success : styles.error
            }`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}
      </form>
    </aside>
  );
}

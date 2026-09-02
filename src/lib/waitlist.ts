import type { Locale } from "@/i18n/config";
import { papiBaseUrl } from "@/lib/currency";

export type WaitlistResult =
  | { ok: true; existing: boolean }
  | { ok: false; reason: "captcha" | "invalid" | "network" | "server" };

export async function submitWaitlist(
  email: string,
  locale: Locale,
  capToken: string,
): Promise<WaitlistResult> {
  try {
    const res = await fetch(`${papiBaseUrl()}/v1/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email,
        locale,
        cap_token: capToken,
      }),
    });

    if (res.ok) {
      const data = (await res.json()) as { ok?: boolean; existing?: boolean };
      return { ok: true, existing: Boolean(data.existing) };
    }

    let message = "";
    try {
      const err = (await res.json()) as { error?: string };
      message = err.error ?? "";
    } catch {
      /* ignore */
    }

    if (res.status === 400) {
      if (message.includes("captcha")) return { ok: false, reason: "captcha" };
      return { ok: false, reason: "invalid" };
    }

    return { ok: false, reason: "server" };
  } catch {
    return { ok: false, reason: "network" };
  }
}

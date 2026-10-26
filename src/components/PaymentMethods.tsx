import { WalletCards } from "lucide-react";
import type { Locale } from "@/i18n/config";
import styles from "./PaymentMethods.module.css";

const labels: Record<Locale, string> = {
  pl: "Akceptowane płatności",
  en: "Accepted payment methods",
  ru: "Способы оплаты",
};

export default function PaymentMethods({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return (
    <div className={`${styles.payments} ${compact ? styles.compact : ""}`} role="group" aria-label={labels[locale]}>
      <p className={styles.label}><WalletCards size={16} aria-hidden="true" />{labels[locale]}</p>
      <ul className={styles.methods}>
        <li><strong>BLIK</strong></li>
        <li><strong>Litecoin</strong><span>LTC</span></li>
        <li><strong>Bitcoin</strong><span>BTC</span></li>
      </ul>
    </div>
  );
}

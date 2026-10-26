"use client";

import { useOptionalCurrency } from "./CurrencyProvider";
import styles from "./Services.module.css";

type Props = { plans: { slug: string; price: string }[]; from: string; period: string };

function numericPrice(value: string) {
  const number = value.replace(/[^\d.,]/g, "");
  const separator = Math.max(number.lastIndexOf("."), number.lastIndexOf(","));
  const fraction = number.length - separator - 1;
  const normalized = separator >= 0 && fraction > 0 && fraction <= 2
    ? `${number.slice(0, separator).replace(/[.,]/g, "")}.${number.slice(separator + 1)}`
    : number.replace(/[.,]/g, "");
  return normalized ? Number(normalized) : Infinity;
}

export default function ServicePrice({ plans, from, period }: Props) {
  const currency = useOptionalCurrency();
  const livePrices = plans.flatMap((plan) => {
    const live = currency?.prices[plan.slug];
    return live?.available && live.standard ? [live.standard] : [];
  });
  const prices = livePrices.length ? livePrices : plans.map((plan) => plan.price);
  const amount = prices.reduce((lowest, price) => numericPrice(price) < numericPrice(lowest) ? price : lowest, prices[0] || "");

  return amount ? <p className={styles.price} data-service-price={plans.map((plan) => plan.slug).join(",")}><span>{from}</span><strong>{amount}</strong><span>{period}</span></p> : null;
}

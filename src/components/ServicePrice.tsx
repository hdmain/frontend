"use client";

import { useOptionalCurrency } from "./CurrencyProvider";
import { numericPrice } from "@/lib/prices";
import styles from "./Services.module.css";

type Props = { plans: { slug: string; price: string }[]; from: string; period: string };

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

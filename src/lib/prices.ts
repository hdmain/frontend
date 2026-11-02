/** Parse formatted PAPI prices, including comma decimals and grouped numbers. */
export function numericPrice(value: string) {
  const number = value.replace(/[^\d.,]/g, "");
  const separator = Math.max(number.lastIndexOf("."), number.lastIndexOf(","));
  const fraction = number.length - separator - 1;
  const normalized = separator >= 0 && fraction > 0 && fraction <= 2
    ? `${number.slice(0, separator).replace(/[.,]/g, "")}.${number.slice(separator + 1)}`
    : number.replace(/[.,]/g, "");
  return normalized ? Number(normalized) : Infinity;
}

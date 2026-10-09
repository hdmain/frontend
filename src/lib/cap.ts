export function capEndpoint(): string {
  const raw =
    process.env.NEXT_PUBLIC_CAP_ENDPOINT?.trim() ||
    "https://captcha.alfahost.eu/9a7fc2383a";
  return raw.endsWith("/") ? raw : `${raw}/`;
}

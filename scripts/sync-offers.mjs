import { writeFile } from "node:fs/promises";

const base = (process.env.NEXT_PUBLIC_PAPI_URL || "https://papi.alfahost.eu").replace(/\/$/, "");
async function read(path) {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`${path}: ${response.status}`);
  return JSON.parse(await response.text(), (_key, value) =>
    typeof value === "string" ? value.replace(/\u2014/g, "-") : value,
  );
}

const entries = await Promise.all(["en", "pl", "ru"].map(async (locale) => {
  const data = await read(`/v1/offers?lang=${locale}&currency=PLN`);
  if (!Array.isArray(data.offers) || !data.offers.length) throw new Error(`Empty catalogue: ${locale}`);
  const offers = await Promise.all(data.offers.map(async (offer) => {
    const { offer: detail } = await read(`/v1/offers/${encodeURIComponent(offer.slug)}?lang=${locale}&currency=PLN`);
    const packages = detail.packages;
    if (!packages?.length) throw new Error(`No packages: ${locale}/${offer.slug}`);
    const range = (key) => {
      const values = packages.map((item) => item[key]);
      if (values.some((value) => !Number.isFinite(value))) throw new Error(`Invalid ${key}: ${offer.slug}`);
      return [Math.min(...values), Math.max(...values)];
    };
    return { ...offer, ram: range("ram_gb"), disk: range("disk_gb"), maxVcpu: Math.max(...packages.map((item) => Number.parseFloat(item.vcpu))), packageCount: packages.length };
  }));
  return [locale, offers];
}));
await writeFile(new URL("../src/i18n/papi-offers.json", import.meta.url), `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`);
console.log(`Synced ${entries[0][1].length} offers in ${entries.length} languages.`);

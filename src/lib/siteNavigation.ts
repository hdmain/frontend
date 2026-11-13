import type { Locale } from "@/i18n/config";

export const siteSections = ["hosting", "game-servers", "nat-vps", "vps", "infrastructure", "ddos-protection", "faq", "contact", "brand-assets"] as const;
export type SiteSection = (typeof siteSections)[number];
export const serviceNavigationCopy = {
  pl: { viewAll: "Zobacz wszystkie", back: "Wróć do usług", catalog: "Pełna oferta" },
  en: { viewAll: "View all", back: "Back to services", catalog: "All hosting offers" },
  ru: { viewAll: "Смотреть все", back: "Назад к услугам", catalog: "Все предложения" },
};
export const serverLocationCopy: Record<Locale, string> = {
  pl: "Serwery gier i VPS NAT w Polsce. VPS KVM w Niemczech i Holandii.",
  en: "Game servers and NAT VPS in Poland. KVM VPS in Germany and the Netherlands.",
  ru: "Игровые серверы и NAT VPS в Польше. KVM VPS в Германии и Нидерландах.",
};
export function offerImage(slug: string) {
  if (slug === "vps-kvm-pl") return "/offers/vps.jpg";
  if (slug === "torrent-box") return "/offers/torrent-box.webp";
  if (slug === "vps-kvm-de" || slug === "vps-kvm-nl") return `/offers/${slug}.webp`;
  return `/offers/${slug}.jpg`;
}
export function offerLocation(locale: Locale, slug: string) {
  if (slug === "torrent-box") return { pl: "Polska", en: "Poland", ru: "Польша" }[locale];
  if (slug === "vps-kvm-pl") return { pl: "Polska", en: "Poland", ru: "Польша" }[locale];
  const country = slug === "vps-kvm-de" ? { pl: "Frankfurt, Niemcy", en: "Frankfurt, Germany", ru: "Франкфурт, Германия" }
    : slug === "vps-kvm-nl" ? { pl: "Holandia", en: "The Netherlands", ru: "Нидерланды" }
    : slug === "dedicated" ? { pl: "Unia Europejska", en: "European Union", ru: "Европейский союз" }
    : { pl: "Warszawa, Polska", en: "Warsaw, Poland", ru: "Варшава, Польша" };
  return country[locale];
}
export const navigationCopy = {
  pl: { about: "O nas", help: "Pomoc", products: "Hosting", infrastructure: "Infrastruktura", legal: "Informacje prawne", games: "Serwery gier", nat: "VPS NAT", vps: "VPS", gamesDesc: "Minecraft, Rust, Palworld i boty Discord", natDesc: "Małe projekty i środowiska testowe", vpsDesc: "KVM w Polsce, Niemczech i Holandii", infrastructureDesc: "Sprzęt i centrum danych w Warszawie", ddosDesc: "Ochrona PletX w każdym planie", configurations: "Wybierz konfigurację", chooseGame: "Wybierz grę lub bota", helpTitle: "Jak możemy pomóc?", home: "Strona główna", navigation: "Nawigacja główna" },
  en: { about: "About us", help: "Support", products: "Hosting", infrastructure: "Infrastructure", legal: "Legal", games: "Game servers", nat: "NAT VPS", vps: "VPS", gamesDesc: "Minecraft, Rust, Palworld and Discord bots", natDesc: "Small projects and test environments", vpsDesc: "KVM in Poland, Germany and the Netherlands", infrastructureDesc: "Hardware and our Warsaw data centre", ddosDesc: "PletX protection on every plan", configurations: "Choose a configuration", chooseGame: "Choose a game or bot", helpTitle: "How can we help?", home: "Home", navigation: "Primary navigation" },
  ru: { about: "О нас", help: "Поддержка", products: "Хостинг", infrastructure: "Инфраструктура", legal: "Правовая информация", games: "Игровые серверы", nat: "NAT VPS", vps: "VPS", gamesDesc: "Minecraft, Rust, Palworld и Discord-боты", natDesc: "Небольшие проекты и тестовые среды", vpsDesc: "KVM в Польше, Германии и Нидерландах", infrastructureDesc: "Оборудование и дата-центр в Варшаве", ddosDesc: "Защита PletX в каждом тарифе", configurations: "Выбрать конфигурацию", chooseGame: "Выберите игру или бота", helpTitle: "Как мы можем помочь?", home: "Главная", navigation: "Основная навигация" },
} satisfies Record<Locale, Record<string, string>>;

export function isSiteSection(value: string): value is SiteSection {
  return siteSections.some((section) => section === value);
}

export function offerPagePath(slug: string) {
  if (slug === "vps-nat") return "nat-vps";
  if (slug === "vps" || slug === "vps-kvm-de" || slug === "vps-kvm-nl") return `offer/${slug === "vps" ? "vps-kvm-de" : slug}`;
  return `offer/${slug}`;
}

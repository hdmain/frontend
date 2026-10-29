import type { Locale } from "@/i18n/config";

export const siteSections = ["hosting", "game-servers", "nat-vps", "vps", "infrastructure", "ddos-protection", "faq", "contact"] as const;
export type SiteSection = (typeof siteSections)[number];
export const serviceNavigationCopy = {
  pl: { viewAll: "Zobacz wszystkie", back: "Wróć do usług", catalog: "Pełna oferta" },
  en: { viewAll: "View all", back: "Back to services", catalog: "All hosting offers" },
  ru: { viewAll: "Смотреть все", back: "Назад к услугам", catalog: "Все предложения" },
};
export const serverLocationCopy: Record<Locale, string> = {
  pl: "Obecnie wszystkie nasze serwery znajdują się w Warszawie, w Polsce.",
  en: "All our servers are currently located in Warsaw, Poland.",
  ru: "Сейчас все наши серверы расположены в Варшаве, Польша.",
};
export const navigationCopy = {
  pl: { about: "O nas", help: "Pomoc", products: "Hosting", infrastructure: "Infrastruktura", legal: "Informacje prawne", games: "Serwery gier", nat: "VPS NAT", vps: "VPS", gamesDesc: "Minecraft, Rust, Palworld i boty Discord", natDesc: "Małe projekty i środowiska testowe", vpsDesc: "KVM, NVMe i pełny dostęp root", infrastructureDesc: "Sprzęt i centrum danych w Warszawie", ddosDesc: "Ochrona PletX w każdym planie", configurations: "Wybierz konfigurację", chooseGame: "Wybierz grę lub bota", helpTitle: "Jak możemy pomóc?", home: "Strona główna", navigation: "Nawigacja główna" },
  en: { about: "About us", help: "Support", products: "Hosting", infrastructure: "Infrastructure", legal: "Legal", games: "Game servers", nat: "NAT VPS", vps: "VPS", gamesDesc: "Minecraft, Rust, Palworld and Discord bots", natDesc: "Small projects and test environments", vpsDesc: "KVM, NVMe and full root access", infrastructureDesc: "Hardware and our Warsaw data centre", ddosDesc: "PletX protection on every plan", configurations: "Choose a configuration", chooseGame: "Choose a game or bot", helpTitle: "How can we help?", home: "Home", navigation: "Primary navigation" },
  ru: { about: "О нас", help: "Поддержка", products: "Хостинг", infrastructure: "Инфраструктура", legal: "Правовая информация", games: "Игровые серверы", nat: "NAT VPS", vps: "VPS", gamesDesc: "Minecraft, Rust, Palworld и Discord-боты", natDesc: "Небольшие проекты и тестовые среды", vpsDesc: "KVM, NVMe и полный root-доступ", infrastructureDesc: "Оборудование и дата-центр в Варшаве", ddosDesc: "Защита PletX в каждом тарифе", configurations: "Выбрать конфигурацию", chooseGame: "Выберите игру или бота", helpTitle: "Как мы можем помочь?", home: "Главная", navigation: "Основная навигация" },
} satisfies Record<Locale, Record<string, string>>;

export function isSiteSection(value: string): value is SiteSection {
  return siteSections.some((section) => section === value);
}

export function offerPagePath(slug: string) {
  return slug === "vps-nat" ? "nat-vps" : slug === "vps" ? "vps" : `offer/${slug}`;
}

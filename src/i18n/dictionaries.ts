import type { Locale } from "./config";

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    home: string;
    why: string;
    services: string;
    antiddos: string;
    offer: string;
    faq: string;
    contact: string;
    panel: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };
  hero: {
    lede: string;
    ctaOffer: string;
    ctaContact: string;
    positivesLabel: string;
    positives: { title: string; copy: string }[];
    phrases: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    learnMore: string;
    items: {
      title: string;
      desc: string;
      points: string[];
    }[];
  };
  protection: {
    eyebrow: string;
    title: string;
    lead: string;
    card1Title: string;
    card1Body: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    card2Title: string;
    points: string[];
  };
  why: {
    eyebrow: string;
    titleBefore: string;
    titleBrand: string;
    lead: string;
    items: { value: string; title: string; copy: string }[];
  };
  offer: {
    eyebrow: string;
    title: string;
    lead: string;
    standard: string;
    premium: string;
    toggleAria: string;
    from: string;
    perMonth: string;
    goToOffer: string;
    orderSubject: string;
    cpu: string;
    ram: string;
    disk: string;
    plans: {
      name: string;
      cpu: string;
      ram: string;
      disk: string;
      price: string;
      premiumPrice: string;
    }[];
  };
  faq: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    lead: string;
    items: { q: string; a: string }[];
  };
  footer: {
    about: string;
    products: string;
    company: string;
    gameServers: string;
    vps: string;
    dedicated: string;
    antiddos: string;
    why: string;
    faq: string;
    contact: string;
    rights: string;
  };
};

const en: Dictionary = {
  meta: {
    title: "AlfaHost — VPS, Game Servers & Anti-DDoS",
    description:
      "Fast VPS, game servers and dedicated machines with DDoS protection included.",
  },
  nav: {
    home: "Home",
    why: "Why us",
    services: "Services",
    antiddos: "Anti-DDoS",
    offer: "Offer",
    faq: "FAQ",
    contact: "Contact",
    panel: "Client Panel",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: {
    lede: "Fast VPS, game servers and dedicated machines — with DDoS protection on every plan and a panel built for operators.",
    ctaOffer: "Our offer",
    ctaContact: "Contact",
    positivesLabel: "Why operators choose us",
    positives: [
      {
        title: "99.9% Uptime",
        copy: "Stable nodes and redundant links so your services stay reachable.",
      },
      {
        title: "Anti-DDoS",
        copy: "Always-on filtering on every plan — no add-on fees, no surprise outages.",
      },
      {
        title: "High performance",
        copy: "Modern CPUs, NVMe storage and clean EU routing for low latency.",
      },
    ],
    phrases: [
      "Servers in Europe.",
      "Game-ready nodes.",
      "DDoS protection included.",
    ],
  },
  services: {
    eyebrow: "What we offer",
    title: "Our services",
    lead: "Game servers, VPS and dedicated machines — all with protection in every plan.",
    learnMore: "Learn more",
    items: [
      {
        title: "Game Servers",
        desc: "Minecraft, Rust, and more with instant deploy and anti-DDoS included.",
        points: [
          "Instant setup",
          "Anti-DDoS included",
          "One-click mods & images",
          "Free subdomain option",
        ],
      },
      {
        title: "VPS Hosting",
        desc: "KVM VPS with NVMe storage, full root access, and predictable performance.",
        points: [
          "Full root / admin access",
          "NVMe SSD storage",
          "Instant OS install",
          "DDoS filtering on every plan",
        ],
      },
      {
        title: "Dedicated Servers",
        desc: "Bare-metal Ryzen and Xeon machines for high-load communities and apps.",
        points: [
          "Modern AMD / Intel CPUs",
          "Up to 10 Gbps links",
          "Remote management",
          "Custom configs on request",
        ],
      },
    ],
  },
  protection: {
    eyebrow: "Global protection network",
    title: "AlfaShield filtering",
    lead: "Multi-layer DDoS mitigation designed for game traffic — scrubbing volumetric noise before it reaches your node.",
    card1Title: "AlfaShield & edge scrubbing",
    card1Body:
      "Inline filtering that drops junk traffic at the edge so your services stay responsive under attack.",
    stat1Value: "Multi-Tbps",
    stat1Label: "DDoS filtration",
    stat2Value: "Always-on",
    stat2Label: "No add-on fee",
    card2Title: "Low latency, no packet loss drama",
    points: [
      "Symmetric filtering — fewer false positives",
      "Automatic port learning — no manual rules",
      "Always-on mitigation — keep players online",
      "Custom filters without extra fees",
    ],
  },
  why: {
    eyebrow: "Get to know us",
    titleBefore: "Why",
    titleBrand: "AlfaHost",
    lead: "Hosting with protection on every plan — no hidden activation fees.",
    items: [
      {
        value: "EU nodes",
        title: "Low latency routing",
        copy: "Hardware placed for Central & Eastern Europe with clean peering paths.",
      },
      {
        value: "Multi-Tbps",
        title: "DDoS without downtime",
        copy: "Filtering stays on by default so wipe nights and launches stay online.",
      },
      {
        value: "Ryzen / Intel",
        title: "Modern hardware",
        copy: "High-clock CPUs, ECC memory and NVMe disks — built for real workloads.",
      },
      {
        value: "Tier III+",
        title: "Serious datacenter",
        copy: "Redundant power and network in a facility designed for continuous ops.",
      },
    ],
  },
  offer: {
    eyebrow: "Explore the catalog",
    title: "Our offer",
    lead: "Sample configurations — switch Premium to compare hardware tiers.",
    standard: "Standard",
    premium: "Premium",
    toggleAria: "Toggle premium offer",
    from: "From",
    perMonth: "/mo",
    goToOffer: "Go to offer",
    orderSubject: "Order",
    cpu: "CPU",
    ram: "RAM",
    disk: "Disk",
    plans: [
      {
        name: "Minecraft",
        cpu: "Ryzen 9 5900X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€4",
        premiumPrice: "€7",
      },
      {
        name: "Rust",
        cpu: "Ryzen 9 5900X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€9",
        premiumPrice: "€14",
      },
      {
        name: "Discord Bot",
        cpu: "Ryzen 9 5950X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€2",
        premiumPrice: "€4",
      },
      {
        name: "VPS",
        cpu: "Ryzen 9 5950X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€8",
        premiumPrice: "€12",
      },
      {
        name: "Palworld",
        cpu: "Ryzen 9 5900X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€12",
        premiumPrice: "€18",
      },
      {
        name: "Dedicated",
        cpu: "Ryzen / Xeon",
        ram: "ECC",
        disk: "NVMe RAID",
        price: "€49",
        premiumPrice: "€79",
      },
    ],
  },
  faq: {
    eyebrow: "Need help?",
    titleBefore: "Frequently",
    titleAccent: "asked questions",
    lead: "Quick answers to what people ask before ordering.",
    items: [
      {
        q: "Is anti-DDoS free?",
        a: "Yes. Every plan includes multi-layer protection from day one — no activation fee and no paid add-on.",
      },
      {
        q: "How fast can I deploy?",
        a: "Most game images and VPS templates are ready within seconds after payment clears.",
      },
      {
        q: "Where are the servers?",
        a: "Our nodes run in Tier III+ European facilities with redundant power and network.",
      },
    ],
  },
  footer: {
    about:
      "AlfaHost delivers premium game hosting, VPS and dedicated servers with anti-DDoS included on every plan.",
    products: "Products",
    company: "Company",
    gameServers: "Game servers",
    vps: "VPS",
    dedicated: "Dedicated",
    antiddos: "Anti-DDoS",
    why: "Why AlfaHost",
    faq: "FAQ",
    contact: "Contact",
    rights: "All rights reserved.",
  },
};

const pl: Dictionary = {
  meta: {
    title: "AlfaHost — VPS, serwery gier i Anty-DDoS",
    description:
      "Szybkie VPS-y, serwery gier i maszyny dedykowane z ochroną DDoS w standardzie.",
  },
  nav: {
    home: "Strona główna",
    why: "O nas",
    services: "Usługi",
    antiddos: "AntyDDoS",
    offer: "Oferta",
    faq: "FAQ",
    contact: "Kontakt",
    panel: "Panel klienta",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    language: "Język",
  },
  hero: {
    lede: "Szybkie VPS-y, serwery gier i maszyny dedykowane — z ochroną DDoS w każdym planie i panelem stworzonym dla operatorów.",
    ctaOffer: "Nasza oferta",
    ctaContact: "Kontakt",
    positivesLabel: "Dlaczego wybierają nas",
    positives: [
      {
        title: "99.9% Uptime",
        copy: "Stabilne węzły i redundantne łącza — usługi zostają dostępne.",
      },
      {
        title: "Anty-DDoS",
        copy: "Filtrowanie zawsze włączone w każdym planie — bez dopłat i niespodzianek.",
      },
      {
        title: "Wysoka wydajność",
        copy: "Nowoczesne CPU, NVMe i czysty routing EU pod niskie opóźnienia.",
      },
    ],
    phrases: [
      "Serwery w Europie.",
      "Węzły gotowe na gry.",
      "Ochrona DDoS w cenie.",
    ],
  },
  services: {
    eyebrow: "Co oferujemy",
    title: "Nasze usługi",
    lead: "Serwery gier, VPS i maszyny dedykowane — ochrona w każdym planie.",
    learnMore: "Dowiedz się więcej",
    items: [
      {
        title: "Serwery gier",
        desc: "Minecraft, Rust i więcej — natychmiastowe wdrożenie i anty-DDoS w cenie.",
        points: [
          "Natychmiastowa konfiguracja",
          "Anty-DDoS w cenie",
          "Mody i obrazy jednym kliknięciem",
          "Opcja darmowej subdomeny",
        ],
      },
      {
        title: "Hosting VPS",
        desc: "VPS KVM z dyskami NVMe, pełnym rootem i przewidywalną wydajnością.",
        points: [
          "Pełny dostęp root/admin",
          "Dyski NVMe SSD",
          "Natychmiastowa instalacja systemu",
          "Filtrowanie DDoS w każdym planie",
        ],
      },
      {
        title: "Serwery dedykowane",
        desc: "Bare-metal Ryzen i Xeon pod wymagające społeczności i aplikacje.",
        points: [
          "Nowoczesne CPU AMD / Intel",
          "Łącza do 10 Gbps",
          "Zdalne zarządzanie",
          "Konfiguracje na zamówienie",
        ],
      },
    ],
  },
  protection: {
    eyebrow: "Globalna sieć ochrony",
    title: "Filtrowanie AlfaShield",
    lead: "Wielowarstwowa mitygacja DDoS pod ruch gier — oczyszcza wolumetryczny śmieć zanim dotrze do Twojego węzła.",
    card1Title: "AlfaShield i edge scrubbing",
    card1Body:
      "Filtrowanie inline usuwa zbędny ruch na brzegu sieci, dzięki czemu usługi zostają responsywne pod atakiem.",
    stat1Value: "Multi-Tbps",
    stat1Label: "Filtracja DDoS",
    stat2Value: "Zawsze włączone",
    stat2Label: "Bez dopłat",
    card2Title: "Niskie opóźnienia, bez dramatów z utratą pakietów",
    points: [
      "Filtrowanie symetryczne — mniej false-positive",
      "Automatyczne uczenie portów — bez ręcznych reguł",
      "Ciągła mitygacja — gracze zostają online",
      "Niestandardowe filtry bez dodatkowych opłat",
    ],
  },
  why: {
    eyebrow: "Poznaj nas",
    titleBefore: "Dlaczego",
    titleBrand: "AlfaHost",
    lead: "Hosting z ochroną w każdym planie — bez ukrytych opłat aktywacyjnych.",
    items: [
      {
        value: "Węzły EU",
        title: "Niskie opóźnienia",
        copy: "Sprzęt pod Europę Środkowo-Wschodnią z czystymi ścieżkami peeringu.",
      },
      {
        value: "Multi-Tbps",
        title: "DDoS bez przestojów",
        copy: "Filtrowanie działa domyślnie — wipe'y i starty zostają online.",
      },
      {
        value: "Ryzen / Intel",
        title: "Nowoczesny sprzęt",
        copy: "Wysokie taktowanie, pamięć ECC i dyski NVMe — pod realne obciążenia.",
      },
      {
        value: "Tier III+",
        title: "Poważne DC",
        copy: "Redundantne zasilanie i sieć w obiekcie zaprojektowanym pod ciągłą pracę.",
      },
    ],
  },
  offer: {
    eyebrow: "Poznaj ofertę",
    title: "Nasza oferta",
    lead: "Przykładowe konfiguracje — przełącz Premium, aby porównać warianty sprzętu.",
    standard: "Standard",
    premium: "Premium",
    toggleAria: "Przełącz ofertę premium",
    from: "Od",
    perMonth: "/mies.",
    goToOffer: "Przejdź do oferty",
    orderSubject: "Zamówienie",
    cpu: "CPU",
    ram: "RAM",
    disk: "Dysk",
    plans: [
      {
        name: "Minecraft",
        cpu: "Ryzen 9 5900X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€4",
        premiumPrice: "€7",
      },
      {
        name: "Rust",
        cpu: "Ryzen 9 5900X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€9",
        premiumPrice: "€14",
      },
      {
        name: "Bot Discord",
        cpu: "Ryzen 9 5950X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€2",
        premiumPrice: "€4",
      },
      {
        name: "VPS",
        cpu: "Ryzen 9 5950X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€8",
        premiumPrice: "€12",
      },
      {
        name: "Palworld",
        cpu: "Ryzen 9 5900X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€12",
        premiumPrice: "€18",
      },
      {
        name: "Dedykowany",
        cpu: "Ryzen / Xeon",
        ram: "ECC",
        disk: "NVMe RAID",
        price: "€49",
        premiumPrice: "€79",
      },
    ],
  },
  faq: {
    eyebrow: "Potrzebujesz pomocy?",
    titleBefore: "Najczęściej",
    titleAccent: "zadawane pytania",
    lead: "Szybkie odpowiedzi na to, o co pytają przed zamówieniem.",
    items: [
      {
        q: "Czy ochrona anty-DDoS jest darmowa?",
        a: "Tak. Każdy plan obejmuje wielowarstwową ochronę od pierwszego dnia — bez opłaty aktywacyjnej i bez płatnych dodatków.",
      },
      {
        q: "Jak szybko uruchomicie serwer?",
        a: "Większość obrazów gier i szablonów VPS jest gotowa w kilka sekund po zaksięgowaniu płatności.",
      },
      {
        q: "Gdzie są serwery?",
        a: "Nasze węzły działają w europejskich centrach danych Tier III+ z redundantnym zasilaniem i siecią.",
      },
    ],
  },
  footer: {
    about:
      "AlfaHost oferuje hosting gier, VPS i serwery dedykowane z anty-DDoS w każdym planie.",
    products: "Produkty",
    company: "Firma",
    gameServers: "Serwery gier",
    vps: "VPS",
    dedicated: "Dedykowane",
    antiddos: "Anty-DDoS",
    why: "Dlaczego AlfaHost",
    faq: "FAQ",
    contact: "Kontakt",
    rights: "Wszelkie prawa zastrzeżone.",
  },
};

const ru: Dictionary = {
  meta: {
    title: "AlfaHost — VPS, игровые серверы и Anti-DDoS",
    description:
      "Быстрые VPS, игровые и выделенные серверы с защитой от DDoS в каждом тарифе.",
  },
  nav: {
    home: "Главная",
    why: "О нас",
    services: "Услуги",
    antiddos: "Anti-DDoS",
    offer: "Тарифы",
    faq: "FAQ",
    contact: "Контакты",
    panel: "Панель клиента",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    language: "Язык",
  },
  hero: {
    lede: "Быстрые VPS, игровые и выделенные серверы — с защитой от DDoS в каждом тарифе и панелью для операторов.",
    ctaOffer: "Наши тарифы",
    ctaContact: "Контакты",
    positivesLabel: "Почему выбирают нас",
    positives: [
      {
        title: "99.9% Uptime",
        copy: "Стабильные ноды и резервные каналы — сервисы остаются доступными.",
      },
      {
        title: "Anti-DDoS",
        copy: "Фильтрация всегда включена в каждом тарифе — без доплат и сюрпризов.",
      },
      {
        title: "Высокая производительность",
        copy: "Современные CPU, NVMe и чистый EU-роутинг для низкой задержки.",
      },
    ],
    phrases: [
      "Серверы в Европе.",
      "Ноды для игр.",
      "DDoS-защита включена.",
    ],
  },
  services: {
    eyebrow: "Что мы предлагаем",
    title: "Наши услуги",
    lead: "Игровые серверы, VPS и выделенные машины — защита в каждом тарифе.",
    learnMore: "Подробнее",
    items: [
      {
        title: "Игровые серверы",
        desc: "Minecraft, Rust и другие — мгновенный деплой и anti-DDoS в цене.",
        points: [
          "Мгновенная настройка",
          "Anti-DDoS включён",
          "Моды и образы в один клик",
          "Опция бесплатного поддомена",
        ],
      },
      {
        title: "VPS-хостинг",
        desc: "KVM VPS с NVMe, полным root-доступом и стабильной производительностью.",
        points: [
          "Полный root / admin",
          "Диски NVMe SSD",
          "Мгновенная установка ОС",
          "Фильтрация DDoS в каждом тарифе",
        ],
      },
      {
        title: "Выделенные серверы",
        desc: "Bare-metal Ryzen и Xeon для высоконагруженных проектов.",
        points: [
          "Современные CPU AMD / Intel",
          "Каналы до 10 Гбит/с",
          "Удалённое управление",
          "Кастомные конфигурации",
        ],
      },
    ],
  },
  protection: {
    eyebrow: "Глобальная сеть защиты",
    title: "Фильтрация AlfaShield",
    lead: "Многоуровневая защита от DDoS для игрового трафика — отсекает объёмный мусор до вашей ноды.",
    card1Title: "AlfaShield и edge scrubbing",
    card1Body:
      "Inline-фильтрация сбрасывает лишний трафик на краю сети, чтобы сервисы оставались отзывчивыми под атакой.",
    stat1Value: "Multi-Tbps",
    stat1Label: "Фильтрация DDoS",
    stat2Value: "Всегда включено",
    stat2Label: "Без доплат",
    card2Title: "Низкая задержка без потери пакетов",
    points: [
      "Симметричная фильтрация — меньше ложных срабатываний",
      "Автообучение портов — без ручных правил",
      "Постоянная митигация — игроки остаются онлайн",
      "Кастомные фильтры без дополнительной платы",
    ],
  },
  why: {
    eyebrow: "Узнайте о нас",
    titleBefore: "Почему",
    titleBrand: "AlfaHost",
    lead: "Хостинг с защитой в каждом тарифе — без скрытых платежей за активацию.",
    items: [
      {
        value: "Ноды EU",
        title: "Низкая задержка",
        copy: "Оборудование для Центральной и Восточной Европы с чистыми маршрутами.",
      },
      {
        value: "Multi-Tbps",
        title: "DDoS без простоев",
        copy: "Фильтрация включена по умолчанию — вайпы и запуски остаются онлайн.",
      },
      {
        value: "Ryzen / Intel",
        title: "Современное железо",
        copy: "Высокие частоты, ECC-память и NVMe — под реальные нагрузки.",
      },
      {
        value: "Tier III+",
        title: "Надёжный ДЦ",
        copy: "Резервное питание и сеть в объекте для непрерывной работы.",
      },
    ],
  },
  offer: {
    eyebrow: "Смотрите каталог",
    title: "Наши тарифы",
    lead: "Примеры конфигураций — переключите Premium, чтобы сравнить железо.",
    standard: "Standard",
    premium: "Premium",
    toggleAria: "Переключить премиум-тариф",
    from: "От",
    perMonth: "/мес.",
    goToOffer: "К тарифу",
    orderSubject: "Заказ",
    cpu: "CPU",
    ram: "RAM",
    disk: "Диск",
    plans: [
      {
        name: "Minecraft",
        cpu: "Ryzen 9 5900X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€4",
        premiumPrice: "€7",
      },
      {
        name: "Rust",
        cpu: "Ryzen 9 5900X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€9",
        premiumPrice: "€14",
      },
      {
        name: "Discord Bot",
        cpu: "Ryzen 9 5950X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€2",
        premiumPrice: "€4",
      },
      {
        name: "VPS",
        cpu: "Ryzen 9 5950X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€8",
        premiumPrice: "€12",
      },
      {
        name: "Palworld",
        cpu: "Ryzen 9 5900X",
        ram: "DDR4",
        disk: "NVMe SSD",
        price: "€12",
        premiumPrice: "€18",
      },
      {
        name: "Dedicated",
        cpu: "Ryzen / Xeon",
        ram: "ECC",
        disk: "NVMe RAID",
        price: "€49",
        premiumPrice: "€79",
      },
    ],
  },
  faq: {
    eyebrow: "Нужна помощь?",
    titleBefore: "Часто",
    titleAccent: "задаваемые вопросы",
    lead: "Короткие ответы на то, что спрашивают перед заказом.",
    items: [
      {
        q: "Anti-DDoS бесплатен?",
        a: "Да. Каждый тариф включает многоуровневую защиту с первого дня — без платы за активацию и платных аддонов.",
      },
      {
        q: "Как быстро можно задеплоить?",
        a: "Большинство игровых образов и шаблонов VPS готовы за секунды после оплаты.",
      },
      {
        q: "Где находятся серверы?",
        a: "Наши ноды работают в европейских дата-центрах Tier III+ с резервным питанием и сетью.",
      },
    ],
  },
  footer: {
    about:
      "AlfaHost предоставляет игровой хостинг, VPS и выделенные серверы с anti-DDoS в каждом тарифе.",
    products: "Продукты",
    company: "Компания",
    gameServers: "Игровые серверы",
    vps: "VPS",
    dedicated: "Выделенные",
    antiddos: "Anti-DDoS",
    why: "Почему AlfaHost",
    faq: "FAQ",
    contact: "Контакты",
    rights: "Все права защищены.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, pl, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

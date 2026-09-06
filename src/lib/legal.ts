import type { Locale } from "@/i18n/config";

/** Controller and covered properties — override address/NIP via env when available. */
export const legalEntity = {
  brand: "AlfaHost",
  website: "https://alfahost.eu",
  panel: "https://cp.alfahost.eu",
  email: "support@alfahost.eu",
  name: process.env.NEXT_PUBLIC_LEGAL_NAME?.trim() || "Tomasz Wiśniewski",
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS?.trim() || "",
  nip: process.env.NEXT_PUBLIC_LEGAL_NIP?.trim() || "",
  country: "Poland / EU",
};

/** Public sites covered by these policies. */
export const coveredServices = ["alfahost.eu", "cp.alfahost.eu"] as const;

function servicesPhrase(locale: Locale): string {
  if (locale === "pl") {
    return "serwisów alfahost.eu oraz cp.alfahost.eu (panel klienta)";
  }
  if (locale === "ru") {
    return "сервисов alfahost.eu и cp.alfahost.eu (панель клиента)";
  }
  return "the alfahost.eu website and cp.alfahost.eu (client panel)";
}

export const CONSENT_STORAGE_KEY = "alfahost-cookie-consent";
export const CONSENT_VERSION = "1";

export type CookieConsentState = {
  version: string;
  necessary: true;
  acceptedAt: string;
};

export function readConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function storeConsent(): CookieConsentState {
  const state: CookieConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    acceptedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  return state;
}

export type LegalDocId = "privacy" | "terms" | "cookies";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDocument = {
  id: LegalDocId;
  metaTitle: string;
  metaDescription: string;
  title: string;
  updated: string;
  sections: LegalSection[];
};

function entityLines(locale: Locale): string[] {
  const lines = [
    locale === "pl"
      ? `Administrator: ${legalEntity.name}`
      : locale === "ru"
        ? `Администратор: ${legalEntity.name}`
        : `Controller: ${legalEntity.name}`,
  ];
  if (legalEntity.address) {
    lines.push(
      locale === "pl"
        ? `Adres: ${legalEntity.address}`
        : locale === "ru"
          ? `Адрес: ${legalEntity.address}`
          : `Address: ${legalEntity.address}`,
    );
  }
  if (legalEntity.nip) {
    lines.push(`NIP: ${legalEntity.nip}`);
  }
  lines.push(
    locale === "pl"
      ? `Kontakt: ${legalEntity.email}`
      : locale === "ru"
        ? `Контакт: ${legalEntity.email}`
        : `Contact: ${legalEntity.email}`,
  );
  lines.push(
    locale === "pl"
      ? `Serwisy: ${legalEntity.website}, ${legalEntity.panel}`
      : locale === "ru"
        ? `Сервисы: ${legalEntity.website}, ${legalEntity.panel}`
        : `Services: ${legalEntity.website}, ${legalEntity.panel}`,
  );
  return lines;
}

function privacy(locale: Locale): LegalDocument {
  const entity = entityLines(locale);
  if (locale === "pl") {
    return {
      id: "privacy",
      metaTitle: "Polityka prywatności | AlfaHost",
      metaDescription:
        "Informacje o przetwarzaniu danych osobowych zgodnie z RODO w serwisach AlfaHost (alfahost.eu, cp.alfahost.eu).",
      title: "Polityka prywatności",
      updated: "5 września 2026",
      sections: [
        {
          heading: "1. Administrator danych",
          paragraphs: [
            `Administratorem danych osobowych przetwarzanych w związku z korzystaniem z ${servicesPhrase("pl")} jest:`,
            ...entity,
          ],
        },
        {
          heading: "2. Zakres i cele przetwarzania",
          paragraphs: [
            "Przetwarzamy dane wyłącznie w zakresie niezbędnym do świadczenia usług i obsługi zapytań.",
          ],
          list: [
            "Adres e-mail – zapis na listę oczekujących, potwierdzenie rejestracji oraz informacja o starcie usług i promocji (art. 6 ust. 1 lit. a RODO – zgoda)",
            "Dane techniczne (adres IP, typ przeglądarki, logi serwera) – bezpieczeństwo i prawidłowe działanie serwisu (art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes)",
            "Preferencje językowe i walutowe przechowywane lokalnie w przeglądarce – wygoda użytkownika (art. 6 ust. 1 lit. f RODO)",
            "Token weryfikacji Cap (captcha) – ochrona formularzy przed nadużyciami (art. 6 ust. 1 lit. f RODO)",
          ],
        },
        {
          heading: "3. Odbiorcy danych",
          paragraphs: [
            "Dane mogą być przekazywane zaufanym podmiotom przetwarzającym je w naszym imieniu, wyłącznie w zakresie niezbędnym do działania Serwisu:",
          ],
          list: [
            "dostawca poczty elektronicznej – wysyłka wiadomości systemowych",
            "dostawca weryfikacji antybotowej (captcha) – ochrona formularzy",
            "dostawcy hostingu i infrastruktury technicznej – utrzymanie Serwisu",
          ],
        },
        {
          heading: "4. Okres przechowywania",
          paragraphs: [
            "Dane z listy oczekujących przechowujemy do momentu uruchomienia platformy i realizacji promocji startowej albo do wycofania zgody – w zależności, co nastąpi wcześniej. Logi techniczne – przez okres uzasadniony względami bezpieczeństwa (zazwyczaj do 12 miesięcy).",
          ],
        },
        {
          heading: "5. Prawa osoby, której dane dotyczą",
          paragraphs: ["Przysługuje Ci prawo do:"],
          list: [
            "dostępu do danych oraz otrzymania ich kopii",
            "sprostowania danych",
            "usunięcia danych („prawo do bycia zapomnianym”)",
            "ograniczenia przetwarzania",
            "przenoszenia danych",
            "wniesienia sprzeciwu",
            "cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania sprzed cofnięcia)",
            "wniesienia skargi do Prezesa UODO (uodo.gov.pl)",
          ],
        },
        {
          heading: "6. Dobrowolność podania danych",
          paragraphs: [
            "Podanie adresu e-mail przy zapisie na listę oczekujących jest dobrowolne, lecz niezbędne do rejestracji. Bez adresu nie możemy potwierdzić zapisu ani przekazać informacji o promocji.",
          ],
        },
        {
          heading: "7. Pliki cookie i podobne technologie",
          paragraphs: [
            "Szczegóły dotyczące plików cookie oraz pamięci lokalnej przeglądarki znajdują się w Polityce cookies.",
          ],
        },
        {
          heading: "8. Zmiany polityki",
          paragraphs: [
            "Polityka może być aktualizowana. Aktualna wersja jest zawsze dostępna pod tym adresem. O istotnych zmianach poinformujemy na stronie lub e-mailem, jeśli jest to wymagane.",
          ],
        },
      ],
    };
  }
  if (locale === "ru") {
    return {
      id: "privacy",
      metaTitle: "Политика конфиденциальности | AlfaHost",
      metaDescription:
        "Информация об обработке персональных данных в соответствии с GDPR в сервисах AlfaHost (alfahost.eu, cp.alfahost.eu).",
      title: "Политика конфиденциальности",
      updated: "5 сентября 2026",
      sections: [
        {
          heading: "1. Контроллер данных",
          paragraphs: [
            `Контроллером персональных данных, обрабатываемых при использовании ${servicesPhrase("ru")}, является:`,
            ...entity,
          ],
        },
        {
          heading: "2. Объём и цели обработки",
          paragraphs: [
            "Мы обрабатываем данные только в объёме, необходимом для оказания услуг и обработки запросов.",
          ],
          list: [
            "Адрес электронной почты — регистрация в списке ожидания, подтверждение и информация о запуске (ст. 6(1)(a) GDPR — согласие)",
            "Технические данные (IP, браузер, логи) — безопасность и работа сайта (ст. 6(1)(f) GDPR)",
            "Языковые и валютные предпочтения в localStorage — удобство (ст. 6(1)(f) GDPR)",
            "Токен Cap (captcha) — защита форм (ст. 6(1)(f) GDPR)",
          ],
        },
        {
          heading: "3. Получатели данных",
          paragraphs: [
            "Данные могут передаваться доверенным обработчикам только в объёме, необходимом для работы Сервиса:",
          ],
          list: [
            "провайдер электронной почты — системные уведомления",
            "провайдер антибот-проверки (captcha) — защита форм",
            "провайдеры хостинга и технической инфраструктуры — поддержка Сервиса",
          ],
        },
        {
          heading: "4. Срок хранения",
          paragraphs: [
            "Данные списка ожидания хранятся до запуска платформы и выполнения стартовой акции либо до отзыва согласия — в зависимости от того, что наступит раньше. Технические логи — в разумный срок для целей безопасности (обычно до 12 месяцев).",
          ],
        },
        {
          heading: "5. Ваши права",
          paragraphs: ["Вы имеете право на:"],
          list: [
            "доступ к данным и получение копии",
            "исправление",
            "удаление",
            "ограничение обработки",
            "переносимость данных",
            "возражение",
            "отзыв согласия в любое время",
            "жалобу в надзорный орган (в Польше — UODO)",
          ],
        },
        {
          heading: "6. Добровольность",
          paragraphs: [
            "Указание e-mail при регистрации в списке ожидания добровольно, но необходимо для записи.",
          ],
        },
        {
          heading: "7. Cookie",
          paragraphs: ["Подробности — в Политике cookie."],
        },
        {
          heading: "8. Изменения",
          paragraphs: [
            "Политика может обновляться. Актуальная версия всегда доступна по этому адресу.",
          ],
        },
      ],
    };
  }
  return {
    id: "privacy",
    metaTitle: "Privacy Policy | AlfaHost",
    metaDescription:
      "How AlfaHost processes personal data under the GDPR for alfahost.eu and cp.alfahost.eu.",
    title: "Privacy Policy",
    updated: "5 September 2026",
    sections: [
      {
        heading: "1. Data controller",
        paragraphs: [
          `The controller of personal data processed in connection with ${servicesPhrase("en")} is:`,
          ...entity,
        ],
      },
      {
        heading: "2. Scope and purposes",
        paragraphs: [
          "We process data only to the extent necessary to operate the service and handle enquiries.",
        ],
        list: [
          "Email address – waitlist registration, confirmation and launch/offer notices (Art. 6(1)(a) GDPR – consent)",
          "Technical data (IP, browser, server logs) – security and service integrity (Art. 6(1)(f) GDPR)",
          "Language and currency preferences in local storage – user convenience (Art. 6(1)(f) GDPR)",
          "Cap captcha token – abuse prevention (Art. 6(1)(f) GDPR)",
        ],
      },
      {
        heading: "3. Recipients",
        paragraphs: [
          "Data may be shared with trusted processors acting on our behalf, only as needed to operate the Service:",
        ],
        list: [
          "email service provider – system notifications",
          "anti-bot verification (captcha) provider – form protection",
          "hosting and technical infrastructure providers – service operations",
        ],
      },
      {
        heading: "4. Retention",
        paragraphs: [
          "Waitlist data is kept until platform launch and fulfilment of the launch offer, or until consent is withdrawn – whichever comes first. Technical logs are kept for a reasonable security period (typically up to 12 months).",
        ],
      },
      {
        heading: "5. Your rights",
        paragraphs: ["You have the right to:"],
        list: [
          "access and obtain a copy of your data",
          "rectification",
          "erasure",
          "restriction of processing",
          "data portability",
          "object to processing",
          "withdraw consent at any time",
          "lodge a complaint with a supervisory authority (in Poland: UODO)",
        ],
      },
      {
        heading: "6. Voluntary provision",
        paragraphs: [
          "Providing an email address for the waitlist is voluntary but required to complete registration.",
        ],
      },
      {
        heading: "7. Cookies",
        paragraphs: ["Details are set out in our Cookie Policy."],
      },
      {
        heading: "8. Changes",
        paragraphs: [
          "This policy may be updated. The current version is always available at this URL.",
        ],
      },
    ],
  };
}

function cookies(locale: Locale): LegalDocument {
  if (locale === "pl") {
    return {
      id: "cookies",
      metaTitle: "Polityka cookies | AlfaHost",
      metaDescription:
        "Informacje o plikach cookie i podobnych technologiach stosowanych w serwisach AlfaHost.",
      title: "Polityka cookies",
      updated: "5 września 2026",
      sections: [
        {
          heading: "1. Czym są pliki cookie",
          paragraphs: [
            "Pliki cookie to niewielkie pliki tekstowe zapisywane w urządzeniu użytkownika. Stosujemy również podobne technologie, takie jak localStorage przeglądarki.",
          ],
        },
        {
          heading: "2. Jakie technologie wykorzystujemy",
          paragraphs: [
            `Niniejsza polityka dotyczy ${servicesPhrase("pl")}. Obecnie nie stosujemy marketingowych ani analitycznych plików cookie stron trzecich. Korzystamy wyłącznie z technologii niezbędnych lub funkcjonalnych:`,
          ],
          list: [
            "localStorage – zapis preferencji języka/waluty oraz statusu zgody na cookies",
            "Cap captcha – techniczne dane sesji weryfikacji bezpieczeństwa formularza",
            "cookie/sesje techniczne serwera – utrzymanie połączenia i bezpieczeństwo",
          ],
        },
        {
          heading: "3. Podstawa prawna",
          paragraphs: [
            "Technologie niezbędne do świadczenia usługi elektronicznej stosujemy na podstawie prawnie uzasadnionego interesu oraz przepisów o świadczeniu usług drogą elektroniczną. Zgoda banera potwierdza, że zapoznałeś się z informacją o stosowanych technologiach.",
          ],
        },
        {
          heading: "4. Zarządzanie",
          paragraphs: [
            "Możesz usunąć dane z localStorage oraz ograniczyć pliki cookie w ustawieniach przeglądarki. Wyłączenie technologii niezbędnych może uniemożliwić korzystanie z części funkcji (np. captcha, preferencje).",
          ],
        },
        {
          heading: "5. Więcej informacji",
          paragraphs: [
            `Szczegóły przetwarzania danych osobowych zawiera Polityka prywatności. Kontakt: ${legalEntity.email}.`,
          ],
        },
      ],
    };
  }
  if (locale === "ru") {
    return {
      id: "cookies",
      metaTitle: "Политика cookie | AlfaHost",
      metaDescription: "Информация о cookie и аналогичных технологиях в сервисах AlfaHost.",
      title: "Политика cookie",
      updated: "5 сентября 2026",
      sections: [
        {
          heading: "1. Что такое cookie",
          paragraphs: [
            "Cookie — небольшие текстовые файлы на устройстве пользователя. Мы также используем localStorage.",
          ],
        },
        {
          heading: "2. Какие технологии мы используем",
          paragraphs: [
            `Настоящая политика распространяется на ${servicesPhrase("ru")}. Мы не используем маркетинговые или аналитические cookie третьих сторон. Только необходимые/функциональные технологии:`,
          ],
          list: [
            "localStorage — язык, валюта, статус согласия",
            "Cap captcha — техническая проверка формы",
            "технические cookie/сессии сервера",
          ],
        },
        {
          heading: "3. Правовое основание",
          paragraphs: [
            "Необходимые технологии применяются для предоставления сервиса. Баннер подтверждает ознакомление с информацией.",
          ],
        },
        {
          heading: "4. Управление",
          paragraphs: [
            "Вы можете удалить данные в настройках браузера. Отключение необходимых технологий может ограничить функции сайта.",
          ],
        },
        {
          heading: "5. Дополнительно",
          paragraphs: [
            `Подробности — в Политике конфиденциальности. Контакт: ${legalEntity.email}.`,
          ],
        },
      ],
    };
  }
  return {
    id: "cookies",
    metaTitle: "Cookie Policy | AlfaHost",
    metaDescription: "How AlfaHost uses cookies and similar technologies.",
    title: "Cookie Policy",
    updated: "5 September 2026",
    sections: [
      {
        heading: "1. What cookies are",
        paragraphs: [
          "Cookies are small text files stored on your device. We also use similar technologies such as browser localStorage.",
        ],
      },
      {
        heading: "2. Technologies we use",
        paragraphs: [
          `This policy covers ${servicesPhrase("en")}. We do not currently use third-party marketing or analytics cookies. We only use necessary or functional technologies:`,
        ],
        list: [
          "localStorage – language/currency preferences and cookie-consent status",
          "Cap captcha – technical challenge session data for form protection",
          "technical server cookies/sessions – connectivity and security",
        ],
      },
      {
        heading: "3. Legal basis",
        paragraphs: [
          "Necessary technologies are used to provide the electronic service. The consent banner confirms that you have been informed about the technologies in use.",
        ],
      },
      {
        heading: "4. Managing preferences",
        paragraphs: [
          "You can clear localStorage and restrict cookies in your browser settings. Disabling necessary technologies may break some features (e.g. captcha or preference persistence).",
        ],
      },
      {
        heading: "5. More information",
        paragraphs: [
          `Personal data processing is described in our Privacy Policy. Contact: ${legalEntity.email}.`,
        ],
      },
    ],
  };
}

function terms(locale: Locale): LegalDocument {
  if (locale === "pl") {
    return {
      id: "terms",
      metaTitle: "Regulamin | AlfaHost",
      metaDescription:
        "Regulamin korzystania z serwisów AlfaHost, w tym panelu klienta i listy oczekujących.",
      title: "Regulamin serwisu",
      updated: "5 września 2026",
      sections: [
        {
          heading: "1. Postanowienia ogólne",
          paragraphs: [
            `Serwisy internetowe alfahost.eu oraz cp.alfahost.eu (panel klienta), łącznie „Serwis”, prowadzone są przez ${legalEntity.name}. Kontakt: ${legalEntity.email}.`,
            "Niniejszy regulamin określa zasady korzystania z Serwisu, w tym z formularza listy oczekujących oraz panelu klienta, w okresie przed uruchomieniem sprzedaży usług hostingowych oraz po jego uruchomieniu w zakresie korzystania z panelu.",
          ],
        },
        {
          heading: "2. Charakter oferty",
          paragraphs: [
            "Opublikowane ceny, pakiety i opisy usług mają charakter informacyjny i mogą ulec zmianie przed oficjalnym startem sprzedaży. Do czasu uruchomienia platformy nie dochodzi do zawarcia umowy o świadczenie usług hostingowych poprzez Serwis.",
          ],
        },
        {
          heading: "3. Lista oczekujących",
          paragraphs: [
            "Zapis na listę oczekujących wymaga podania prawidłowego adresu e-mail, przejścia weryfikacji Cap oraz wyrażenia zgody na przetwarzanie danych zgodnie z Polityką prywatności.",
            "Promocja startowa (m.in. rabat na pierwsze zamówienie) zostanie przekazana zarejestrowanym osobom zgodnie z zasadami ogłoszonymi przy starcie. AlfaHost zastrzega prawo do zmiany szczegółów promocji z ważnych przyczyn organizacyjnych lub prawnych.",
          ],
        },
        {
          heading: "4. Zasady korzystania",
          paragraphs: [
            "Użytkownik zobowiązuje się do korzystania z Serwisu zgodnie z prawem i dobrymi obyczajami, w szczególności do niepodejmowania działań zagrażających bezpieczeństwu Serwisu, niepodszywaniu się pod inne osoby oraz nieprzesyłaniu treści bezprawnych.",
          ],
        },
        {
          heading: "5. Odpowiedzialność",
          paragraphs: [
            "W najszerszym zakresie dopuszczalnym przez prawo AlfaHost nie ponosi odpowiedzialności za przerwy w dostępności Serwisu spowodowane siłą wyższą, pracami serwisowymi lub działaniem osób trzecich. Treści informacyjne Serwisu nie stanowią oferty w rozumieniu Kodeksu cywilnego, o ile nie wskazano inaczej.",
          ],
        },
        {
          heading: "6. Własność intelektualna",
          paragraphs: [
            "Znaki towarowe, logo, treść i układ Serwisu są chronione prawem. Kopiowanie bez zgody jest zabronione, z wyjątkiem dozwolonego użytku przewidzianego przepisami.",
          ],
        },
        {
          heading: "7. Prawo właściwe",
          paragraphs: [
            "Do korzystania z Serwisu stosuje się prawo polskie oraz obowiązujące przepisy prawa Unii Europejskiej. Ewentualne spory rozstrzygane będą przez sąd właściwy według przepisów ogólnych, z zastrzeżeniem uprawnień konsumentów wynikających z prawa UE.",
          ],
        },
        {
          heading: "8. Zmiany regulaminu",
          paragraphs: [
            "Regulamin może być aktualizowany. Aktualna wersja jest publikowana w Serwisie. Kontynuowanie korzystania z Serwisu po publikacji zmian oznacza ich akceptację w zakresie dozwolonym prawem.",
          ],
        },
      ],
    };
  }
  if (locale === "ru") {
    return {
      id: "terms",
      metaTitle: "Условия использования | AlfaHost",
      metaDescription: "Условия использования сервисов AlfaHost, включая панель клиента.",
      title: "Условия использования",
      updated: "5 сентября 2026",
      sections: [
        {
          heading: "1. Общие положения",
          paragraphs: [
            `Сервисы alfahost.eu и cp.alfahost.eu (панель клиента), совместно «Сервис», поддерживаются ${legalEntity.name}. Контакт: ${legalEntity.email}.`,
            "Настоящие условия регулируют использование Сервиса, включая форму списка ожидания и панель клиента, до запуска продаж и после запуска в части использования панели.",
          ],
        },
        {
          heading: "2. Характер предложений",
          paragraphs: [
            "Опубликованные цены и описания носят информационный характер и могут измениться до официального старта. До запуска платформы через Сервис не заключается договор на хостинг-услуги.",
          ],
        },
        {
          heading: "3. Список ожидания",
          paragraphs: [
            "Для записи необходимы корректный e-mail, прохождение Cap и согласие на обработку данных согласно Политике конфиденциальности.",
            "Стартовая акция будет направлена зарегистрированным пользователям по правилам, объявленным при запуске.",
          ],
        },
        {
          heading: "4. Правила использования",
          paragraphs: [
            "Пользователь обязуется использовать Сервис законно и не предпринимать действий, угрожающих его безопасности.",
          ],
        },
        {
          heading: "5. Ответственность",
          paragraphs: [
            "В максимально допустимой законом степени AlfaHost не несёт ответственности за перерывы, вызванные непреодолимой силой, обслуживанием или действиями третьих лиц.",
          ],
        },
        {
          heading: "6. Интеллектуальная собственность",
          paragraphs: [
            "Контент и оформление Сервиса защищены правом. Копирование без разрешения запрещено, кроме случаев, предусмотренных законом.",
          ],
        },
        {
          heading: "7. Применимое право",
          paragraphs: [
            "Применяется право Польши и применимое право Европейского Союза.",
          ],
        },
        {
          heading: "8. Изменения",
          paragraphs: [
            "Условия могут обновляться. Актуальная версия публикуется на сайте.",
          ],
        },
      ],
    };
  }
  return {
    id: "terms",
    metaTitle: "Terms of Use | AlfaHost",
    metaDescription: "Terms of use for AlfaHost services, including the client panel.",
    title: "Terms of Use",
    updated: "5 September 2026",
    sections: [
      {
        heading: "1. General",
        paragraphs: [
          `The websites alfahost.eu and cp.alfahost.eu (client panel), together the “Service”, are operated by ${legalEntity.name}. Contact: ${legalEntity.email}.`,
          "These terms govern use of the Service, including the waitlist form and the client panel, before hosting sales are launched and after launch insofar as the panel is used.",
        ],
      },
      {
        heading: "2. Nature of the offer",
        paragraphs: [
          "Published prices, packages and descriptions are informational and may change before official sales launch. Until the platform goes live, no hosting service contract is concluded via the Service.",
        ],
      },
      {
        heading: "3. Waitlist",
        paragraphs: [
          "Joining the waitlist requires a valid email address, Cap verification and consent to data processing under the Privacy Policy.",
          "The launch promotion (including any first-order discount) will be communicated to registered users under the rules announced at launch. AlfaHost may adjust promotion details for organisational or legal reasons.",
        ],
      },
      {
        heading: "4. Acceptable use",
        paragraphs: [
          "You must use the Service lawfully and must not undermine its security, impersonate others or submit unlawful content.",
        ],
      },
      {
        heading: "5. Liability",
        paragraphs: [
          "To the fullest extent permitted by law, AlfaHost is not liable for downtime caused by force majeure, maintenance or third-party acts. Informational content does not constitute a binding commercial offer unless expressly stated.",
        ],
      },
      {
        heading: "6. Intellectual property",
        paragraphs: [
          "Branding, content and layout are protected. Copying without permission is prohibited except as allowed by law.",
        ],
      },
      {
        heading: "7. Governing law",
        paragraphs: [
          "Use of the Service is governed by Polish law and applicable European Union law, without prejudice to mandatory consumer protections.",
        ],
      },
      {
        heading: "8. Changes",
        paragraphs: [
          "These terms may be updated. The current version is published on the Service.",
        ],
      },
    ],
  };
}

export function getLegalDocument(
  locale: Locale,
  id: LegalDocId,
): LegalDocument {
  switch (id) {
    case "privacy":
      return privacy(locale);
    case "cookies":
      return cookies(locale);
    case "terms":
      return terms(locale);
  }
}

export const legalPaths: LegalDocId[] = ["privacy", "terms", "cookies"];

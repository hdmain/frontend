import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import styles from "./TorrentBoxContent.module.css";

export const torrentCopy = {
  pl: {
    title: "TorrentBox hosting w Polsce - seedbox qBittorrent",
    description: "Torrent Box AlfaHost: seedbox w Polsce z qBittorrent WebUI, ochroną anty-DDoS i czterema konfiguracjami. Porównaj pakiety i wybierz zasoby.",
    heading: "TorrentBox: Twój seedbox w przeglądarce",
    intro: "TorrentBox hosting to usługa do pobierania i seedowania plików na zdalnym serwerze. AlfaHost Torrent Box udostępnia qBittorrent WebUI, dzięki któremu zarządzasz zadaniami z przeglądarki. Pliki i zadania działają po stronie serwera, więc własny komputer nie musi pozostawać włączony podczas transferu.",
    sections: [
      { title: "qBittorrent z WebUI", text: "Dodawaj zadania, obserwuj postęp pobierania i zarządzaj seedowaniem przez interfejs qBittorrent. WebUI pozwala obsługiwać usługę bez instalowania klienta torrent na każdym urządzeniu, z którego korzystasz." },
      { title: "Do czego przyda się seedbox?", text: "Do dystrybucji własnych plików, udostępniania otwartych zbiorów danych oraz pobierania i seedowania obrazów systemów Linux. Zasoby Torrent Box możesz dobrać do liczby aktywnych zadań i rozmiaru przechowywanych plików." },
      { title: "Jak wybrać pakiet?", text: "Zacznij od pojemności dysku potrzebnej na pliki. Większy RAM i przydział CPU przydadzą się przy większej liczbie zadań. Porównaj aktualne konfiguracje powyżej: ich ceny, zasoby i liczbę kopii zapasowych pobieramy z bieżącej oferty." },
    ],
    faqTitle: "Pytania o Torrent Box",
    faq: [
      { q: "Czy TorrentBox i seedbox to to samo?", a: "Seedbox to zdalny serwer do pobierania i seedowania torrentów. Torrent Box jest nazwą tej usługi w AlfaHost i korzysta z qBittorrent z interfejsem WebUI." },
      { q: "Gdzie znajdują się serwery Torrent Box?", a: "Serwery Torrent Box AlfaHost znajdują się w Polsce." },
      { q: "Czy muszę mieć cały czas włączony komputer?", a: "Nie. Zadania obsługuje zdalny serwer. Przeglądarka służy do zarządzania nimi przez WebUI." },
      { q: "Czy ochrona anty-DDoS jest w cenie?", a: "Tak, aktualne pakiety Torrent Box obejmują ochronę anty-DDoS. Szczegóły zasobów i kopii zapasowych znajdziesz przy wybranej konfiguracji." },
      { q: "Jak zamówić Torrent Box?", a: "Wybierz pakiet i przejdź do panelu klienta przyciskiem zakupu. Przed potwierdzeniem sprawdź konfigurację, cenę i warunki zamówienia." },
    ], contact: "Pomoc w wyborze pakietu", packages: "Porównaj pakiety",
  },
  en: {
    title: "TorrentBox hosting in Poland - qBittorrent seedbox",
    description: "AlfaHost Torrent Box: a seedbox in Poland with qBittorrent WebUI, anti-DDoS protection and four configurations. Compare packages and resources.",
    heading: "TorrentBox: manage your seedbox in a browser",
    intro: "TorrentBox hosting lets you download and seed files on a remote server. AlfaHost Torrent Box provides qBittorrent WebUI so you can manage tasks from your browser. Transfers run on the server, so your own computer does not need to stay switched on while files are transferring.",
    sections: [
      { title: "qBittorrent WebUI", text: "Add tasks, monitor downloads and manage seeding through qBittorrent. The browser interface lets you manage the service without installing a torrent client on every device you use." },
      { title: "What can you use a seedbox for?", text: "Distribute your own files, share open datasets, or download and seed Linux images. Choose resources according to the number of active tasks and the size of the files you keep." },
      { title: "Choosing a package", text: "Start with the storage capacity your files need. More RAM and CPU allocation can help with larger numbers of tasks. Compare the current packages above for live prices, resources and backup counts." },
    ], faqTitle: "Torrent Box questions",
    faq: [
      { q: "Are TorrentBox and seedbox the same thing?", a: "A seedbox is a remote server for downloading and seeding torrents. Torrent Box is AlfaHost's service using qBittorrent with WebUI." },
      { q: "Where are the servers located?", a: "AlfaHost Torrent Box servers are located in Poland." },
      { q: "Does my computer need to stay switched on?", a: "No. The remote server runs your tasks. Your browser provides access to WebUI to manage them." },
      { q: "Is anti-DDoS protection included?", a: "Yes, current Torrent Box packages include anti-DDoS protection. Resources and backup counts are listed for each configuration." },
      { q: "How do I order?", a: "Choose a package and follow the purchase button to the client panel. Check the configuration, price and order terms before confirming." },
    ], contact: "Help choosing a package", packages: "Compare packages",
  },
  ru: {
    title: "TorrentBox хостинг в Польше - seedbox qBittorrent",
    description: "Torrent Box AlfaHost: seedbox в Польше с qBittorrent WebUI, защитой от DDoS и четырьмя конфигурациями. Сравните тарифы и ресурсы.",
    heading: "TorrentBox: управляйте seedbox в браузере",
    intro: "TorrentBox позволяет скачивать и раздавать файлы на удалённом сервере. AlfaHost Torrent Box предоставляет qBittorrent WebUI для управления заданиями через браузер. Передача файлов выполняется на сервере, поэтому ваш компьютер не должен оставаться включённым во время загрузки.",
    sections: [
      { title: "qBittorrent WebUI", text: "Добавляйте задания, следите за загрузкой и управляйте раздачами через qBittorrent. Веб-интерфейс позволяет работать без установки торрент-клиента на каждое устройство." },
      { title: "Для чего нужен seedbox?", text: "Для распространения собственных файлов, открытых наборов данных и образов Linux. Выбирайте ресурсы с учётом числа активных заданий и размера хранимых файлов." },
      { title: "Как выбрать тариф?", text: "Начните с объёма диска для ваших файлов. Дополнительные RAM и CPU пригодятся при большем количестве заданий. Сравните актуальные цены, ресурсы и количество резервных копий в тарифах выше." },
    ], faqTitle: "Вопросы о Torrent Box",
    faq: [
      { q: "TorrentBox и seedbox - одно и то же?", a: "Seedbox - удалённый сервер для скачивания и раздачи торрентов. Torrent Box - услуга AlfaHost на основе qBittorrent с WebUI." },
      { q: "Где находятся серверы?", a: "Серверы Torrent Box AlfaHost находятся в Польше." },
      { q: "Нужно ли держать компьютер включённым?", a: "Нет. Задания выполняются на удалённом сервере. Браузер нужен для управления через WebUI." },
      { q: "Включена ли защита от DDoS?", a: "Да, актуальные тарифы Torrent Box включают защиту от DDoS. Ресурсы и количество резервных копий указаны в каждой конфигурации." },
      { q: "Как заказать услугу?", a: "Выберите тариф и перейдите в панель клиента по кнопке покупки. Перед подтверждением проверьте конфигурацию, цену и условия заказа." },
    ], contact: "Помощь с выбором тарифа", packages: "Сравнить тарифы",
  },
};

export default function TorrentBoxContent({ locale }: { locale: Locale }) {
  const t = torrentCopy[locale];
  return <section className={`container ${styles.section}`}>
    <header><h2 className="sectionTitle">{t.heading}</h2><p className={styles.intro}>{t.intro}</p></header>
    <div className={styles.grid}>{t.sections.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    <div className={styles.faq}><h2>{t.faqTitle}</h2>{t.faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
    <div className={styles.actions}><a href="#offer" className="btn btnPrimary">{t.packages}</a><a href={localePath(locale, "contact")} className="btn btnGhost">{t.contact}</a></div>
  </section>;
}

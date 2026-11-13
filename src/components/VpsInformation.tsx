import { Check } from "lucide-react";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import styles from "./VpsInformation.module.css";
import { getPlan } from "@/i18n/dictionaries";

const systems = [
  { name: "Ubuntu 24.04 LTS", id: "os-14" },
  { name: "Ubuntu 22.04 LTS", id: "os-7" },
  { name: "Debian 12", id: "os-12" },
  { name: "Debian 13", id: "os-13" },
  { name: "Rocky Linux 9", id: "os-9" },
  { name: "AlmaLinux 9", id: "os-8" },
  { name: "Windows Server 2025", id: "os-20" },
  { name: "Windows Server 2022", id: "os-21" },
];

const copy = {
  pl: {
    title: "VPS KVM pod Twoje projekty",
    lead: "Wybierz lokalizację w Polsce, Niemczech lub Holandii, dobierz zasoby i system operacyjny. Pełny dostęp administracyjny pozwala przygotować środowisko do własnych aplikacji i usług.",
    features: [
      { title: "Wirtualizacja KVM", text: "Własne środowisko systemowe i pełny dostęp administracyjny. Konfigurujesz aplikacje, konta użytkowników i usługi zgodnie z potrzebami projektu." },
      { title: "Publiczne IPv4 i sieć 1 Gbit/s", text: "Udostępniaj aplikacje i usługi przez publiczny adres IPv4. Port sieciowy 1 Gbit/s jest częścią oferty VPS KVM." },
      { title: "Dyski SSD i wybór zasobów", text: "Porównaj przydział CPU, pamięć RAM i pojemność SSD przy każdym pakiecie. Dobierz konfigurację do aplikacji, baz danych, środowisk testowych lub paneli." },
      { title: "Trzy lokalizacje", text: "VPS PL działa w Polsce na Intel Xeon E3-1225 v6. VPS DE działa we Frankfurcie na AMD EPYC 7551P. VPS NL korzysta z Intel i9-10900K w Holandii. Aktualną cenę i dostępność sprawdzisz na karcie konfiguracji." },
    ],
    osTitle: "Dostępne systemy operacyjne", osLead: "Dystrybucje Linux oraz Windows Server dostępne dla VPS KVM DE i NL. Dobierz system do oprogramowania, z którego korzystasz.",
    contact: "Pomoc w wyborze VPS", compare: "Porównaj lokalizacje", 
  },
  en: {
    title: "KVM VPS for your projects",
    lead: "Choose Poland, Germany or the Netherlands, select your resources and operating system. Full administrative access lets you prepare an environment for your own applications and services.",
    features: [
      { title: "KVM virtualisation", text: "Your own operating system environment with full administrative access. Configure applications, user accounts and services for your project." },
      { title: "Public IPv4 and a 1 Gbit/s port", text: "Expose applications and services through a public IPv4 address. A 1 Gbit/s network port is included in the KVM VPS offer." },
      { title: "SSD storage and configurable resources", text: "Compare CPU allocation, RAM and SSD capacity on each package. Choose resources for applications, databases, test environments or control panels." },
      { title: "Three locations", text: "VPS PL runs in Poland on Intel Xeon E3-1225 v6. VPS DE runs in Frankfurt on AMD EPYC 7551P. VPS NL uses Intel i9-10900K in the Netherlands. Check each configuration for current pricing and availability." },
    ],
    osTitle: "Available operating systems", osLead: "Linux distributions and Windows Server are available for KVM VPS DE and NL. Choose an operating system suited to your software.",
    contact: "Help choosing a VPS", compare: "Compare locations",
  },
  ru: {
    title: "KVM VPS для ваших проектов",
    lead: "Выберите Польшу, Германию или Нидерланды, ресурсы и операционную систему. Полный административный доступ позволяет подготовить среду для собственных приложений и сервисов.",
    features: [
      { title: "Виртуализация KVM", text: "Собственная системная среда с полным административным доступом. Настраивайте приложения, учётные записи и сервисы под задачи проекта." },
      { title: "Публичный IPv4 и порт 1 Гбит/с", text: "Публикуйте приложения и сервисы через публичный IPv4. Сетевой порт 1 Гбит/с входит в предложение KVM VPS." },
      { title: "SSD и выбор ресурсов", text: "Сравните CPU, RAM и объём SSD в каждом тарифе. Подберите конфигурацию для приложений, баз данных, тестовых сред или панелей управления." },
      { title: "Три локации", text: "VPS PL работает в Польше на Intel Xeon E3-1225 v6. VPS DE работает во Франкфурте на AMD EPYC 7551P. VPS NL использует Intel i9-10900K в Нидерландах. Актуальная цена и наличие указаны в конфигурации." },
    ],
    osTitle: "Доступные операционные системы", osLead: "Дистрибутивы Linux и Windows Server доступны для KVM VPS DE и NL. Выберите систему под ваше программное обеспечение.",
    contact: "Помощь с выбором VPS", compare: "Сравнить локации",
  },
};

export default function VpsInformation({ locale, slug }: { locale: Locale; slug?: string }) {
  const polish = slug === "vps-kvm-pl";
  const plan = getPlan(locale, "vps-kvm-pl");
  const localSystems = systems.filter((system) => ["os-13", "os-14"].includes(system.id));
  const plNote = { pl: "VPS PL: dostępne wyłącznie Debian 13 i Ubuntu 24.04 LTS.", en: "VPS PL: only Debian 13 and Ubuntu 24.04 LTS are available.", ru: "VPS PL: доступны только Debian 13 и Ubuntu 24.04 LTS." }[locale];
  const t = polish && plan ? { ...copy[locale], lead: plan.description, osLead: plNote, features: [copy[locale].features[0], { title: "Intel Xeon E3-1225 v6", text: `${plan.cpu} · ${plan.ram} RAM · ${plan.disk} SSD` }, { title: "IPv4 · Anti-DDoS", text: plan.summary }] } : copy[locale];
  return <section className={`container ${styles.section}`}>
    <h2 className="sectionTitle">{t.title}</h2><p className={styles.lead}>{t.lead}</p>
    <div className={styles.features}>{t.features.map((item) => <article key={item.title}><h3><Check size={18} aria-hidden="true" />{item.title}</h3><p>{item.text}</p></article>)}</div>
    <div className={styles.systems}><h2>{t.osTitle}</h2><p className={styles.lead}>{t.osLead}</p>
      {!slug && <p className={styles.lead}>{plNote}</p>}
      <ul>{(polish ? localSystems : systems).map((system) => {
        const logo = system.name.startsWith("Ubuntu") ? "ubuntu" : system.name.startsWith("Debian") ? "debian" : system.name.startsWith("Rocky") ? "rockylinux" : system.name.startsWith("Alma") ? "almalinux" : "windows";
        return <li key={system.id} data-os-id={polish ? undefined : system.id}><span className={styles.osIcon}><Image src={asset(`/brands/${logo}.svg`)} alt="" width={24} height={24} /></span><span>{system.name}</span></li>;
      })}</ul>
    </div>
    <div className={styles.actions}><a href={localePath(locale, "vps")} className="btn btnGhost">{t.compare}</a><a href={localePath(locale, "contact")} className="btn btnPrimary">{t.contact}</a></div>
  </section>;
}

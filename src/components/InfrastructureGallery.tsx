import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { asset } from "@/lib/basePath";
import styles from "./InfrastructureGallery.module.css";

const source = "https://atman.pl/en/atman-data-center/warsaw-1/";
const copy = {
  pl: { title: "Atman WAW-1 z bliska", lead: "Kampus centrum danych w Warszawie przy ul. Grochowskiej 21a. Zdjęcia z oficjalnej galerii Atmana.", source: "Zdjęcia: Atman · oficjalna galeria WAW-1", open: "Otwórz zdjęcie w pełnym rozmiarze", captions: ["Widok kampusu WAW-1", "Budynek Atmana i wjazd na teren kampusu", "Instalacje techniczne budynków centrum danych", "Wnętrze budynku F5"] },
  en: { title: "A closer look at Atman WAW-1", lead: "The Warsaw data-centre campus at 21a Grochowska Street. Photos from Atman's official gallery.", source: "Photos: Atman · official WAW-1 gallery", open: "Open full-size photo", captions: ["WAW-1 campus overview", "Atman building and campus entrance", "Data-centre building technical installations", "Inside the F5 building"] },
  ru: { title: "Знакомство с Atman WAW-1", lead: "Кампус дата-центра в Варшаве на улице Grochowska 21a. Фотографии из официальной галереи Atman.", source: "Фото: Atman · официальная галерея WAW-1", open: "Открыть фото в полном размере", captions: ["Общий вид кампуса WAW-1", "Здание Atman и въезд в кампус", "Технические системы зданий дата-центра", "Внутри здания F5"] },
};
const photos = [
  { file: "waw1-10.jpg", width: 1920, height: 1438 },
  { file: "waw1-181.jpg", width: 1920, height: 1280 },
  { file: "waw1-274.jpg", width: 1920, height: 1280 },
  { file: "waw1-244.jpg", width: 1920, height: 1280 },
];

export default function InfrastructureGallery({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className={styles.section} id="waw1-gallery" aria-labelledby="waw1-title">
      <div className="container">
        <header className={styles.head}><div><h2 className="sectionTitle" id="waw1-title">{t.title}</h2><p className="sectionLead">{t.lead}</p></div><span className={styles.location}><MapPin size={15} aria-hidden="true" />Warszawa, PL · WAW-1</span></header>
        <div className={styles.grid}>
          {photos.map((photo, index) => (
            <figure key={photo.file} className={styles.photo}>
              <a href={asset(`/media/atman/${photo.file}`)} target="_blank" rel="noopener noreferrer" className={styles.frame} aria-label={`${t.captions[index]} — ${t.open}`}>
                <Image src={asset(`/media/atman/${photo.file}`)} width={photo.width} height={photo.height} sizes={index === 0 ? "(max-width: 1240px) 100vw, 1176px" : "(max-width: 640px) 100vw, (max-width: 900px) 50vw, 400px"} alt={t.captions[index]} />
                <span className={styles.expand} aria-hidden="true"><ArrowUpRight size={19} /></span>
              </a>
              <figcaption>{t.captions[index]}</figcaption>
            </figure>
          ))}
        </div>
        <a className={styles.source} href={source} target="_blank" rel="noopener noreferrer">{t.source}<ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

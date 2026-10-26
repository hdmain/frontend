import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Check, MapPin } from "lucide-react";
import { asset } from "@/lib/basePath";
import styles from "./PageIntro.module.css";

type Props = { title: string; lead: string; image: string; action?: { href: string; label: string }; points?: string[]; status?: string; location?: string; back?: { href: string; label: string } };

export default function PageIntro({ title, lead, image, action, points, status, location, back }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.media} aria-hidden="true"><Image src={asset(image)} fill priority sizes="100vw" alt="" /></div>
      <div className={`container ${styles.inner}`}>
        {back && <a className={styles.back} href={back.href}><ArrowLeft size={17} aria-hidden="true" />{back.label}</a>}
        <h1>{title}</h1>
        <p>{lead}</p>
        {location && <p className={styles.location}><MapPin size={16} aria-hidden="true" />{location}</p>}
        {status && <p className={styles.status}>{status}</p>}
        {points && <ul>{points.map((point) => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul>}
        {action && <a className="btn btnPrimary" href={action.href}>{action.label}<ArrowUpRight size={17} aria-hidden="true" /></a>}
      </div>
    </section>
  );
}

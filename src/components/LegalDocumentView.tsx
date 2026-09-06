import type { LegalDocument } from "@/lib/legal";
import styles from "./LegalDocumentView.module.css";

type Props = {
  doc: LegalDocument;
  updatedLabel: string;
};

export default function LegalDocumentView({ doc, updatedLabel }: Props) {
  return (
    <article className={styles.article}>
      <header className={styles.head}>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.updated}>
          {updatedLabel}: {doc.updated}
        </p>
      </header>

      {doc.sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <h2 className={styles.heading}>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.p}>
              {paragraph}
            </p>
          ))}
          {section.list ? (
            <ul className={styles.list}>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}

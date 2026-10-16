import type { Metadata } from "next";
import { getPgpPublicKey } from "@/lib/pgpPublicKey";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import styles from "./page.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `PGP public key · ${SITE_NAME}`,
  description: "AlfaHost PGP public key (alfadmin <admin@alfahost.eu>).",
  alternates: {
    canonical: `${SITE_URL}/pgp/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PgpPage() {
  const key = getPgpPublicKey();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>PGP public key</h1>
        <p>
          <code>alfadmin &lt;admin@alfahost.eu&gt;</code>
          {" · "}
          <a href="/pgp.txt">download raw (.txt)</a>
        </p>
      </header>
      <pre className={styles.key}>{key}</pre>
    </main>
  );
}

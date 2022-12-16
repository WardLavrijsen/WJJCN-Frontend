import Head from "next/head";
import styles from "../styles/Home.module.css";

import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({}) {
  const router = useRouter();

  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageLoad(true);
    }, 10);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={pageLoad ? styles.main : styles.Fadein}>
        <div>
          <Link style={{ cursor: "pointer" }} href={"/"}>
            <img
              style={{ cursor: "pointer" }}
              className={styles.logo}
              alt="world of content logo"
              src="/images/w-logo.png"
            />
          </Link>
          <h1 className={styles.fourTitle}>404</h1>
          <h2 className={styles.fourUnderTitle}>Page not found!</h2>
          <Link href="/">
            <h1 className={styles.fourLink}>Home Page</h1>
          </Link>
        </div>
      </main>
    </div>
  );
}

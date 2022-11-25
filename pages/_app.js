import "../styles/globals.css";

import styles from "../styles/Home.module.css";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import Router from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading ? (
        <main className={styles.mainTextDiv}>
          <div className={styles.loadingText}>
            <AiOutlineLoading3Quarters size={150} />
          </div>
          <h1 className={styles.loadingTitle}>Loading...</h1>
        </main>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default App

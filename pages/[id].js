import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Card } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home({ brands, error }) {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(brands);

  return (
    <div className={styles.container}>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {error ? (
          <div className="flex items-center justify-center gap-2 flex-col bg-red-600 text-white p-7 rounded-xl">
            <h1 className="text-3xl">ERROR:</h1>
            <h1>{error}</h1>
            <h2>Probeer later opnieuw</h2>
          </div>
        ) : (
          <div className={styles.cardGrid}></div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.headers.host;
  try {
    const res = await fetch(
      `http://${url}/api/retailerbybrand?name=${context.query.id}`
    );
    const data = await res.json();
    if (data.status === "error") {
      return {
        props: {
          error: "Data kan niet opgehaald worden",
        },
      };
    } else {
      return {
        props: { brands: data.data, error: null },
      };
    }
  } catch (error) {
    return {
      error: error,
    };
  }
}

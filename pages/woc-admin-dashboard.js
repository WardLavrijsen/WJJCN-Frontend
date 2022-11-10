import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";

import { BiLogIn } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";

export default function Home({ error, errorStateServer }) {
  const [getError, setError] = useState(error);
  const [errorState, setErrorState] = useState(errorStateServer);

  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div
          className={styles.errorBox}
          style={errorState ? { display: "block" } : { display: "none" }}
        >
          <h3>Error: {getError}</h3>
        </div>
        <Link href="/">
          <img
            style={{ cursor: "pointer" }}
            className={styles.logo}
            alt="world of content logo"
            src="/images/w-logo.png"
          />
        </Link>
        {error ? (
          <div className="flex items-center justify-center gap-2 flex-col bg-red-600 text-white p-7 rounded-xl">
            <h1 className="text-3xl">ERROR:</h1>
            <h1>{error}</h1>
            <h2>Probeer later opnieuw</h2>
          </div>
        ) : (
          <>
            <div className={styles.search}>
              <h1 className={styles.HomeTitle}>Admin Dashboard</h1>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.headers.host;
  try {
    if (!context.query.token)
      return {
        redirect: {
          destination: "/woc-admin",
          permanent: false,
        },
        props: {},
      };

    const res = await fetch(
      `http://${url}/api/verify?token=${context.query.token}`
    );
    const data = await res.json();
    if (data.data.statuscode === 200) {
      return {
        props: {
          error: null,
          errorStateServer: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/woc-admin",
          permanent: false,
        },
        props: {},
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/woc-admin",
        permanent: false,
      },
      props: {},
    };
  }
}

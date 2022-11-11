import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";

import { BiLogIn } from "react-icons/bi";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home({ error, errorStateServer }) {
  const [input, setInput] = useState("");

  const [getError, setError] = useState(error);
  const [errorState, setErrorState] = useState(errorStateServer);

  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageLoad(true);
    }, 10);
  }, []);

  const autenticate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/login?password=${input}`);
    const data = await res.json();
    if (data.data.statuscode === 200) {
      if (data.data.token) {
        const link = "/woc-admin-dashboard?token=" + data.data.token;
        router.push(link);
      }
    } else {
      setError(data.data.body);
      setErrorState(true);
      setTimeout(() => {
        setErrorState(false);
      }, 3000);
    }
  };

  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={pageLoad ? styles.main : styles.Fadein}>
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
              <h1 className={styles.HomeTitle}>Admin</h1>

              <div className={styles.Searchbox}>
                <input
                  value={input}
                  type="password"
                  style={{ border: "none" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      autenticate(e);
                    }
                  }}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  placeholder="Password..."
                  className={styles.Searchbar}
                />
                <button onClick={autenticate} className={styles.SearchButton}>
                  <BiLogIn />
                </button>
              </div>
              <button onClick={autenticate} className={styles.LoginButton}>
                Login
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

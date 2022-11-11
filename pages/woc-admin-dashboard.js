import Head from "next/head";
import styles from "../styles/Home.module.css";
import gridStyles from "../styles/Grid.module.css";
import adminSytles from "../styles/Admin.module.css";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [getError, setError] = useState("");
  const [errorState, setErrorState] = useState(false);

  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageLoad(true);
    }, 10);
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      setErrorState(true);
      setTimeout(() => {
        setErrorState(false);
      }, 3000);
    } else {
      const res = await fetch(
        `/api/newpassword?password=${password}&token=${router.query.token}`
      );
      const response = await res.json();
      console.log(response);
    }
  };

  return (
    <div>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={pageLoad ? adminSytles.main : adminSytles.Fadein}>
        <div className={adminSytles.parent}>
          <div className={adminSytles.div1}>
            <div
              className={styles.errorBox}
              style={errorState ? { display: "block" } : { display: "none" }}
            >
              <h3>Error: {getError}</h3>
            </div>
            <Link style={{ cursor: "pointer" }} href={"/"}>
              <img
                style={{ cursor: "pointer" }}
                className={styles.logo}
                alt="world of content logo"
                src="/images/w-logo.png"
              />
            </Link>
            <div className={adminSytles.buttonLinks}>
              <button className={adminSytles.statusButtons}>
                Strart Scraper
              </button>
              <button className={adminSytles.statusButtons}>
                Stop Scraper
              </button>
              <button className={adminSytles.statusButtons}>Log Out!</button>
            </div>
          </div>
          <div className={adminSytles.div2}>
            <div className={adminSytles.displayCard}></div>
          </div>
          <div className={adminSytles.div3}>
            <div className={adminSytles.displayCard}>
              <h1 className={adminSytles.settingsTitle}>Settings</h1>
              <h3 className={adminSytles.settingsLabel}>Day to run scraper:</h3>
              <select className={adminSytles.settingsInput} type="text">
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
              <h3
                style={{ marginTop: "1vh" }}
                className={adminSytles.settingsLabel}
              >
                Time to run scraper:
              </h3>
              <input className={adminSytles.settingsInput} type="time" />
              <button className={adminSytles.settingsButton}>
                Save Settings
              </button>

              <h3
                style={{ marginTop: "3vh" }}
                className={adminSytles.settingsLabel}
              >
                New Password:
              </h3>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={adminSytles.settingsInput}
                type="password"
              />
              <h3
                style={{ marginTop: "1vh" }}
                className={adminSytles.settingsLabel}
              >
                Confirm Password:
              </h3>
              <input
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className={adminSytles.settingsInput}
                type="password"
              />
              <button
                onClick={handlePasswordChange}
                className={adminSytles.settingsButton}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
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

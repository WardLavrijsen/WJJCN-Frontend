import Link from "next/link";

import adminSytles from "../styles/admin/AdminMenu.module.css";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";

export default function AdminPageMenu({
  errorState,
  errorMessage,
  errorColor,
  setError,
  setErrorState,
  setErrorColor,
  token,
}) {
  const router = useRouter();

  const handleScrapeNow = async () => {
    const response = await fetch("/api/scrapenow", {
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
    });
    const data = await response.json();
    setError("Sraper has started!");
    setErrorState(true);
    setErrorColor("#27ae60");
    setTimeout(() => {
      setErrorState(false);
    }, 3000);
  };

  const logout = () => {
    router.push("/woc-admin");
  };
  return (
    <div className={adminSytles.div1}>
      <div
        className={styles.errorBox}
        style={
          errorState
            ? { display: "block", backgroundColor: errorColor }
            : { display: "none" }
        }
      >
        <h3>{errorMessage}</h3>
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
        <button onClick={handleScrapeNow} className={adminSytles.statusButtons}>
          Strart Scraper
        </button>
        <button onClick={logout} className={adminSytles.statusButtons}>
          Log Out!
        </button>
      </div>
    </div>
  );
}

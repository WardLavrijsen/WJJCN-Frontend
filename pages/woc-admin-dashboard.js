import Head from "next/head";
import styles from "../styles/Home.module.css";
import gridStyles from "../styles/Grid.module.css";
import adminSytles from "../styles/Admin.module.css";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { BsFillXCircleFill, BsCheckCircleFill, BsX } from "react-icons/bs";

import Link from "next/link";

export default function Home({
  retailersServer,
  orgRetailers,
  error,
  errorStateServer,
  token,
  logs,
}) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [active, setActive] = useState("retailers");
  const [retailers, setRetailers] = useState(retailersServer);
  // const [retailers, setRetailers] = useState([]);

  const [errorForErrorPage, setErrorForErrorPage] = useState("");

  const [getError, setError] = useState(error);
  const [errorState, setErrorState] = useState(errorStateServer);
  const [errorColor, setErrorColor] = useState("#c0392b");

  const [pageLoad, setPageLoad] = useState(false);

  const updateRetailers = async () => {
    const response = await fetch("/api/updatebrands", {
      method: "POST",
      body: JSON.stringify({
        retailers: retailers.map((r) => {
          r.scrape = r.scrape ? "true" : "false";
          return r;
        }),
        token: token,
      }),
    });
    if (response.status === 200) {
      setError("Retailers are updated!");
      setErrorState(true);
      setErrorColor("#27ae60");

      setTimeout(() => {
        setErrorState(false);
        router.reload(window.location.pathname);
      }, 2000);
    } else {
      setError("Something went wrong!");
      setErrorState(true);
      setErrorColor("#c0392b");

      setTimeout(() => {
        setErrorState(false);
      }, 2000);
    }
  };

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
      }, 2000);
    } else {
      const res = await fetch(
        `/api/newpassword?password=${password}&token=${router.query.token}`
      );
      const response = await res.json();
      if (response.status === "ok") {
        setError("Password changed successfully");
        setErrorState(true);
        setErrorColor("#27ae60");

        setTimeout(() => {
          setErrorState(false);
          router.push("/woc-admin");
        }, 3000);
      }
    }
  };

  const logout = () => {
    router.push("/woc-admin");
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
              style={
                errorState
                  ? { display: "block", backgroundColor: errorColor }
                  : { display: "none" }
              }
            >
              <h3>{getError}</h3>
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
              <button onClick={logout} className={adminSytles.statusButtons}>
                Log Out!
              </button>
            </div>
          </div>
          <div className={adminSytles.div2}>
            <div className={adminSytles.displayCard}>
              <button
                className={adminSytles.tab1}
                style={
                  active === "retailers"
                    ? { backgroundColor: "white", border: "1px solid black" }
                    : { backgroundColor: "#d8d8d8" }
                }
                onClick={() => setActive("retailers")}
              >
                Retailers
              </button>
              <button
                className={adminSytles.tab2}
                style={
                  active === "scraper"
                    ? { backgroundColor: "white", border: "1px solid black" }
                    : { backgroundColor: "#d8d8d8" }
                }
                onClick={() => setActive("scraper")}
              >
                Scraper
              </button>
              <div
                className={adminSytles.infobox}
                style={
                  active === "retailers"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <div className={adminSytles.titlebox}>
                  <h1 className={adminSytles.titleintitlebox}>Retailers</h1>
                  <div>
                    <button
                      style={{ marginRight: "1rem" }}
                      className={adminSytles.buttonintitlebox}
                      onClick={() => {
                        setRetailers(JSON.parse(JSON.stringify(orgRetailers)));
                      }}
                    >
                      Reset
                    </button>
                    <button
                      onClick={updateRetailers}
                      className={adminSytles.buttonintitlebox}
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className={adminSytles.headerbox}>
                  <div className={adminSytles.headerboxScrape}>Scrape</div>
                  <div className={adminSytles.headerboxName}>Name</div>
                  <div className={adminSytles.headerboxUrl}>Scrape URL</div>
                </div>
                <div className={adminSytles.retailersbox}>
                  {retailers.map((retailer, index) => {
                    return (
                      <div key={index} className={adminSytles.retailerbox}>
                        <div className={adminSytles.retailerboxScrape}>
                          <input
                            checked={retailer.scrape}
                            className={adminSytles.checkbox}
                            type="checkbox"
                            onChange={(e) => {
                              const newRetailers = [...retailers];
                              newRetailers[index].scrape = e.target.checked;
                              setRetailers(newRetailers);
                            }}
                          />
                        </div>
                        <div className={adminSytles.retailerboxName}>
                          <input
                            value={retailer.name}
                            className={adminSytles.retailerboxNameInput}
                            type="text"
                            onChange={(e) => {
                              const newRetailers = [...retailers];
                              newRetailers[index].name = e.target.value;
                              setRetailers(newRetailers);
                            }}
                          />
                        </div>
                        <div className={adminSytles.retailerboxUrl}>
                          <input
                            value={retailer.url_to_scrape}
                            className={adminSytles.retailerboxNameInput}
                            type="text"
                            onChange={(e) => {
                              const newRetailers = [...retailers];
                              newRetailers[index].url_to_scrape =
                                e.target.value;
                              setRetailers(newRetailers);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className={adminSytles.infobox}
                style={
                  active === "scraper"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <div className={adminSytles.titlebox}>
                  <h1 className={adminSytles.titleintitlebox}>Scraper</h1>
                  <h3 className={adminSytles.savedintitlebox}>
                    Last scraped on: {logs[0].date_run}
                  </h3>
                </div>
                <div className={adminSytles.headerbox}>
                  <div className={adminSytles.headerboxStatus}>Status</div>
                  <div className={adminSytles.headerboxRetailerName}>Name</div>
                  <div className={adminSytles.headerboxStep}>Step 1</div>
                  <div className={adminSytles.headerboxStep}>Step 2</div>
                  <div className={adminSytles.headerboxStep}>Step 3</div>
                  <div className={adminSytles.headerboxStep}>Step 4</div>
                </div>
                <div className={adminSytles.retailersbox}>
                  {logs.map((retailer) => {
                    {
                      if (
                        retailer.steps.link_crawling.status &&
                        retailer.steps.link_check.status &&
                        retailer.steps.product_fetch_compare.status &&
                        retailer.steps.save_to_database.status
                      ) {
                        retailer.isgood = true;
                      } else {
                        retailer.isgood = false;
                      }
                    }
                    return (
                      <div
                        key={retailer._id}
                        className={adminSytles.retailerbox}
                      >
                        <div className={adminSytles.scraperboxStatus}>
                          <div>
                            {retailer.isgood ? (
                              <BsCheckCircleFill
                                className={adminSytles.okicon}
                              />
                            ) : (
                              <BsFillXCircleFill
                                className={adminSytles.erroricon}
                              />
                            )}
                          </div>
                        </div>
                        <div className={adminSytles.scraperboxName}>
                          {retailer.retailer}
                        </div>
                        <div className={adminSytles.scraperboxStep}>
                          {retailer.steps.link_crawling.status ? (
                            <BsCheckCircleFill className={adminSytles.okicon} />
                          ) : (
                            <button
                              onClick={() => {
                                setErrorForErrorPage(
                                  retailer.steps.link_crawling.error
                                );
                                setActive("error");
                              }}
                              className={adminSytles.errorBox}
                            >
                              <BsX className={adminSytles.erroriconsmall} />
                              Info
                            </button>
                          )}
                        </div>
                        <div className={adminSytles.scraperboxStep}>
                          {retailer.steps.link_check.status ? (
                            <BsCheckCircleFill className={adminSytles.okicon} />
                          ) : (
                            <button
                              onClick={() => {
                                setErrorForErrorPage(
                                  retailer.steps.link_check.error
                                );
                                setActive("error");
                              }}
                              className={adminSytles.errorBox}
                            >
                              <BsX className={adminSytles.erroriconsmall} />
                              Info
                            </button>
                          )}
                        </div>
                        <div className={adminSytles.scraperboxStep}>
                          {retailer.steps.product_fetch_compare.status ? (
                            <BsCheckCircleFill className={adminSytles.okicon} />
                          ) : (
                            <button
                              onClick={() => {
                                setErrorForErrorPage(
                                  retailer.steps.product_fetch_compare.error
                                );
                                setActive("error");
                              }}
                              className={adminSytles.errorBox}
                            >
                              <BsX className={adminSytles.erroriconsmall} />
                              Info
                            </button>
                          )}
                        </div>
                        <div className={adminSytles.scraperboxStep}>
                          {retailer.steps.save_to_database.status ? (
                            <BsCheckCircleFill className={adminSytles.okicon} />
                          ) : (
                            <button
                              onClick={() => {
                                setErrorForErrorPage(
                                  retailer.steps.save_to_database.error
                                );
                                setActive("error");
                              }}
                              className={adminSytles.errorBox}
                            >
                              <BsX className={adminSytles.erroriconsmall} />
                              Info
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className={adminSytles.infobox}
                style={
                  active === "error"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <div className={adminSytles.titlebox}>
                  <h1 className={adminSytles.titleintitlebox}>Error</h1>
                  <div>
                    <button
                      onClick={() => setActive("scraper")}
                      className={adminSytles.buttonintitlebox}
                    >
                      Go Back
                    </button>
                  </div>
                </div>
                <h3 className={adminSytles.errorintitlebox}>
                  {errorForErrorPage}
                </h3>
              </div>
            </div>
          </div>
          <div className={adminSytles.div3}>
            <div className={adminSytles.displayCardSettings}>
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
    if (!context.query.token) {
      return {
        redirect: {
          destination: "/woc-admin",
          permanent: false,
        },
        props: {},
      };
    }

    const res = await fetch(
      `http://${url}/api/verify?token=${context.query.token}`
    );
    const data = await res.json();

    const resLogs = await fetch(
      `http://${url}/api/getlogs?token=${context.query.token}`
    );
    const dataLogs = await resLogs.json();

    console.log(dataLogs.data[0]);

    const retailersResponse = await fetch(`http://${url}/api/allretailers`);
    const retailersData = await retailersResponse.json();

    const retailers = retailersData.data.map((r) => {
      r.scrape = r.scrape === "true" ? true : false;
      return r;
    });

    const orgRetailers = JSON.parse(JSON.stringify(retailers));

    if (data.data.statuscode === 200) {
      if (retailersData.status === "ok") {
        if (dataLogs.status === "ok") {
          return {
            props: {
              logs: dataLogs.data,
              token: context.query.token,
              retailersServer: retailers,
              orgRetailers: orgRetailers,
              error: "",
              errorStateServer: false,
            },
          };
        } else {
          return {
            props: {
              error: "Kon logs niet ophalen",
              errorStateServer: true,
            },
          };
        }
      } else {
        return {
          props: {
            error: "Geen Retailers gevonden",
            errorStateServer: true,
          },
        };
      }
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
    console.log(error);
    return {
      redirect: {
        destination: "/woc-admin",
        permanent: false,
      },
      props: {},
    };
  }
}

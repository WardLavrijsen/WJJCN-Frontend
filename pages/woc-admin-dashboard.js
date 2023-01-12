import Head from "next/head";
import adminSytles from "../styles/Admin.module.css";

import AdminPageMenu from "../components/AdminPageMenu";
import AdminPageSettings from "../components/AdminPageSettings";
import AdminPageRetailers from "../components/AdminPageRetailers";
import AdminPageScraper from "../components/AdminPageScraper";
import AdminPageAddRetailer from "../components/AdminPageAddRetailer";
import AdminPageBrands from "../components/AdminPageBrands";
import AdminPageAddBrand from "../components/AdminPageAddBrand";
import AdminPageProducts from "../components/AdminPageProducts";
import AdminPageEditProduct from "../components/AdminPageEditProduct";

import { useState, useEffect } from "react";

export default function Home({
  retailersServer,
  orgRetailers,
  error,
  errorStateServer,
  token,
  logs,
  date,
  time,
  brandsServer,
  products,
}) {
  const [active, setActive] = useState("brands");

  const [retailers, setRetailers] = useState(retailersServer);
  const [brands, setBrands] = useState(brandsServer);

  const [errorForErrorPage, setErrorForErrorPage] = useState("");

  const [selectedProduct, setSelectedProduct] = useState({});

  const [getError, setError] = useState(error);
  const [errorState, setErrorState] = useState(errorStateServer);
  const [errorColor, setErrorColor] = useState("#c0392b");

  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageLoad(true);
    }, 10);
  }, []);

  return (
    <div>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={pageLoad ? adminSytles.main : adminSytles.Fadein}>
        <div className={adminSytles.parent}>
          <AdminPageMenu
            errorState={errorState}
            errorMessage={getError}
            errorColor={errorColor}
            token={token}
            setError={setError}
            setErrorState={setErrorState}
            setErrorColor={setErrorColor}
          />
          <div className={adminSytles.div2}>
            <div className={adminSytles.displayCard}>
              <button
                className={adminSytles.tab1}
                style={
                  active === "brands"
                    ? { backgroundColor: "white", border: "1px solid black" }
                    : { backgroundColor: "#d8d8d8" }
                }
                onClick={() => setActive("brands")}
              >
                Brands
              </button>
              <button
                className={adminSytles.tab2}
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
                className={adminSytles.tab3}
                style={
                  active === "scraper"
                    ? { backgroundColor: "white", border: "1px solid black" }
                    : { backgroundColor: "#d8d8d8" }
                }
                onClick={() => setActive("scraper")}
              >
                Scraper
              </button>
              <button
                className={adminSytles.tab4}
                style={
                  active === "products"
                    ? { backgroundColor: "white", border: "1px solid black" }
                    : { backgroundColor: "#d8d8d8" }
                }
                onClick={() => setActive("products")}
              >
                Products
              </button>
              <AdminPageBrands
                setActive={setActive}
                active={active}
                token={token}
                setError={setError}
                setErrorState={setErrorState}
                setErrorColor={setErrorColor}
                brands={brands}
                setBrands={setBrands}
              />
              <AdminPageRetailers
                setActive={setActive}
                retailersServer={retailersServer}
                active={active}
                token={token}
                setError={setError}
                setErrorState={setErrorState}
                setErrorColor={setErrorColor}
                orgRetailers={orgRetailers}
                retailers={retailers}
                setRetailers={setRetailers}
              />
              <AdminPageScraper
                logs={logs}
                active={active}
                setActive={setActive}
                setErrorForErrorPage={setErrorForErrorPage}
              />
              <AdminPageProducts
                setActive={setActive}
                active={active}
                products={products}
                setSelectedProduct={setSelectedProduct}
              />
              <AdminPageEditProduct
                active={active}
                setActive={setActive}
                token={token}
                setError={setError}
                setErrorState={setErrorState}
                setErrorColor={setErrorColor}
                selectedProduct={selectedProduct}
              />
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
              <AdminPageAddRetailer
                active={active}
                setActive={setActive}
                token={token}
                setError={setError}
                setErrorState={setErrorState}
                setErrorColor={setErrorColor}
                retailers={retailers}
                setRetailers={setRetailers}
              />
              <AdminPageAddBrand
                active={active}
                setActive={setActive}
                retailers={retailers}
                token={token}
                setError={setError}
                setErrorState={setErrorState}
                setErrorColor={setErrorColor}
                brands={brands}
                setBrands={setBrands}
              />
            </div>
          </div>
          <AdminPageSettings
            token={token}
            setError={setError}
            setErrorState={setErrorState}
            setErrorColor={setErrorColor}
            date={date}
            time={time}
          />
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

    // const notification = await fetch(
    //   `https://ntfy.sh/WOC_Live_Score_push_notifications`,
    //   {
    //     method: "POST", // PUT works too
    //     body: "Login to WOC Admin Dashboard", // string or object
    //   }
    // );

    const AllRes = await fetch(
      `http://${url}/api/getadminpagecontent?token=${context.query.token}`
    );
    const AllData = await AllRes.json();

    const retailers = AllData.data.allRetailers.map((r) => {
      r.scrape = r.scrape === "true" ? true : false;
      return r;
    });

    const orgRetailers = JSON.parse(JSON.stringify(retailers));

    if (!AllData.data) {
      return {
        props: {
          error: "Error met ophalen API",
          errorStateServer: true,
        },
      };
    }
    if (AllData.status == "ok") {
      return {
        props: {
          date: AllData.data.allAdminSettings[0].day_to_scrape,
          time: AllData.data.allAdminSettings[0].time_to_scrape,
          logs: AllData.data.allLogs.reverse(),
          products: AllData.data.allProductsArray,
          token: context.query.token,
          retailersServer: retailers,
          orgRetailers: orgRetailers,
          error: "",
          errorStateServer: false,
          brandsServer: AllData.data.allBrands,
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

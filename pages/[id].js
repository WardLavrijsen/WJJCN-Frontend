import Head from "next/head";
import styles from "../styles/Home.module.css";
import gridStyles from "../styles/Grid.module.css";
import cardStyles from "../styles/RetailerProductBox.module.css";

import { Card } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";

import { BiSearch, BiHomeAlt } from "react-icons/bi";
import { BsChevronDoubleRight } from "react-icons/bs";
import Link from "next/link";

export default function Home({ brands, error, errorStateServer }) {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState([...brands, ...brands]);
  const [loading, setLoading] = useState(true);
  console.log(data);

  const [input, setInput] = useState("");

  const [getError, setError] = useState(error);
  const [errorState, setErrorState] = useState(errorStateServer);

  const clickLink = (e) => {
    console.log(input);
  };

  return (
    <div>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={gridStyles.main}>
        <div className={gridStyles.parent}>
          <div className={gridStyles.div1}>
            <img
              className={styles.logo}
              alt="world of content logo"
              src="/images/w-logo.png"
            />
            <h3 className={gridStyles.breadcrums}>
              <Link href="/" className={gridStyles.Link}>
                <BiHomeAlt
                  style={{ cursor: "pointer" }}
                  className={gridStyles.homeLogo}
                />
              </Link>
              <BsChevronDoubleRight className={gridStyles.homeLogo} />
              <Link href={"/"}>
                <u style={{ cursor: "pointer" }}>{id}</u>
              </Link>
            </h3>
            <div className={gridStyles.Searchbox}>
              <input
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    clickLink(e);
                  }
                }}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                placeholder="Search a retailer...."
                className={gridStyles.Searchbar}
              />
              <button onClick={clickLink} className={gridStyles.SearchButton}>
                <BiSearch />
              </button>
            </div>
          </div>
          <div className={gridStyles.div2}>
            {data.map((brand) => {
              return (
                <div key={brand.retailers} className={cardStyles.displayCard}>
                  <h2 className={cardStyles.retailertitle}>
                    {brand.retailers}
                  </h2>
                  <div className={cardStyles.productenBox}>
                    {brand.products.map((product) => {
                      return (
                        <div
                          key={product.name}
                          className={cardStyles.productBox}
                        >
                          <h4 className={cardStyles.productName}>
                            {product.name}
                          </h4>
                          <p className={cardStyles.scoreName}>
                            {product.score} Similarity
                          </p>
                          <div className={cardStyles.progressBar}>
                            <div
                              style={{
                                width: `${product.score}`,
                                backgroundColor:
                                  parseInt(product.score) >= 50
                                    ? parseInt(product.score) >= 75
                                      ? "#2ecc71"
                                      : "#F1C40F"
                                    : parseInt(product.score) >= 25
                                    ? "#E67E22"
                                    : "#E74C3C",
                              }}
                              className={cardStyles.progressBarInsert}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={gridStyles.div3}>
            <button className={gridStyles.pageCircleDiv}>{"<"}</button>
            <button className={gridStyles.activePageCircleDiv}>{"1"}</button>
            <button className={gridStyles.pageCircleDiv}>{"2"}</button>
            <button className={gridStyles.pageCircleDiv}>{"3"}</button>
            <button className={gridStyles.pageCircleDiv}>{">"}</button>
          </div>
        </div>

        <div
          className={styles.errorBox}
          style={errorState ? { display: "block" } : { display: "none" }}
        >
          <h3>Error: {getError}</h3>
        </div>
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
          errorStateServer: true,
        },
      };
    } else {
      return {
        props: { brands: data.data, error: null, errorStateServer: false },
      };
    }
  } catch (error) {
    return {
      error: error,
      errorStateServer: true,
    };
  }
}

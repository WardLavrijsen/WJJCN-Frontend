import Head from "next/head";
import styles from "../styles/Home.module.css";
import modelStyles from "../styles/Model.module.css";

import Link from "next/link";

import { useRouter } from "next/router";

import { BiSearch, BiX } from "react-icons/bi";
import { useState, useEffect } from "react";

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

export default function Home({ brandData, error, errorStateServer }) {
  const [brands, setBrands] = useState(brandData);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [model, setModel] = useState(false);

  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageLoad(true);
    }, 10);
  }, []);

  let notStateBrand;

  const [getError, setError] = useState(error);
  const [errorState, setErrorState] = useState(errorStateServer);

  const setSimilarity = (value) => {
    const suggestions = brands.filter((brand) => {
      if (!value) return false;
      if (similarity(brand, value) >= 0.7) return true;
      if (brand.toLowerCase().includes(value.toLowerCase())) return true;
      if (value.toLowerCase().includes(brand.toLowerCase())) return true;
      return false;
    });
    setSuggestions(suggestions);
  };

  const router = useRouter();

  const test = new Array([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);

  const clickLink = (e) => {
    e.preventDefault();
    if (notStateBrand) {
      if (brands.includes(notStateBrand)) {
        router.push("/" + notStateBrand);
      } else {
        const brand = brands.find(
          (element) => element.toLowerCase() == input.toLowerCase()
        );
        if (brand) {
          router.push("/" + brand);
        } else {
          setErrorState(true);
          setError("Brand not found!");

          setTimeout(() => {
            setErrorState(false);
            setError("");
          }, 3000);
        }
      }
    } else {
      if (brands.includes(input)) {
        router.push("/" + input);
      } else {
        const brand = brands.find(
          (element) => element.toLowerCase() == input.toLowerCase()
        );
        if (brand) {
          router.push("/" + brand);
        } else {
          setErrorState(true);
          setError("Brand not found!");

          setTimeout(() => {
            setErrorState(false);
            setError("");
          }, 3000);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={pageLoad ? styles.main : styles.Fadein}>
        {model ? (
          <div
            onClick={() => setModel(false)}
            className={modelStyles.overlay}
          ></div>
        ) : (
          <button
            onClick={() => setModel(true)}
            className={modelStyles.openModelButton}
          >
            All Brands
          </button>
        )}
        {model ? (
          <div on={() => setModel(false)} className={modelStyles.model}>
            <button
              onClick={() => setModel(false)}
              className={modelStyles.closeButton}
            >
              <BiX />
            </button>
            <div className={modelStyles.div1}>
              <h1 className={modelStyles.modelTitle}>All Brands</h1>
            </div>
            <div className={modelStyles.div2}>
              {brands.map((brand) => (
                <div key={brand} className={modelStyles.brandButtonDiv}>
                  <button
                    onClick={(e) => {
                      notStateBrand = brand;
                      clickLink(e);
                    }}
                    className={modelStyles.brandButton}
                  >
                    {brand}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
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
        {error ? (
          <div className="flex items-center justify-center gap-2 flex-col bg-red-600 text-white p-7 rounded-xl">
            <h1 className="text-3xl">ERROR:</h1>
            <h1>{error}</h1>
            <h2>Probeer later opnieuw</h2>
          </div>
        ) : model ? null : (
          <>
            <div className={styles.search}>
              <h1 className={styles.HomeTitle}>Welcome</h1>
              <h2 className={styles.SecondTitle}>
                World of Content Live Score
              </h2>
              <h3 className={styles.ThirdTitle}>Select a brand to continue</h3>

              <div className={styles.Searchbox}>
                <input
                  value={input}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      clickLink(e);
                    }
                  }}
                  onChange={(e) => {
                    setSimilarity(e.target.value);
                    setInput(e.target.value);
                  }}
                  placeholder="Search a brand...."
                  className={styles.Searchbar}
                />
                <button onClick={clickLink} className={styles.SearchButton}>
                  <BiSearch />
                </button>
              </div>
              {suggestions.length > 0 ? (
                <div className={styles.suggestionbox}>
                  <div className={styles.autocompleteItems}>
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion}
                        onClick={(e) => {
                          setInput(suggestion);
                          setSuggestions([]);
                          notStateBrand = suggestion;
                          clickLink(e);
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
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
    const res = await fetch(`http://${url}/api/allbrands`);
    const data = await res.json();
    const brands = data.data.map((brand) => brand.name);

    if (data.status === "error") {
      return {
        props: {
          error: "Something went wrong",
          errorStateServer: true,
        },
      };
    } else {
      return {
        props: {
          brandData: brands,
          alldata: data.data,
          error: null,
          errorStateServer: false,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        brands: null,
        error: error.message,
        errorStateServer: true,
      },
    };
  }
}

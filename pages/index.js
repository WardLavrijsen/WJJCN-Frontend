import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";

import { BiSearch } from "react-icons/bi";
import { useState } from "react";

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

export default function Home({ brandData, error }) {
  const [brands, setBrands] = useState(brandData);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  const clickLink = (e) => {
    e.preventDefault();
    if (brands.includes(input)) {
      router.push("/" + input);
    } else {
      const brand = brands.find(
        (element) => element.toLowerCase() == input.toLowerCase()
      );
      if (brand) {
        router.push("/" + brand);
      } else {
        alert("Brand Staat niet in de database!");
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

      <main className={styles.main}>
        <img
          className={styles.logo}
          alt="world of content logo"
          src="/images/w-logo.png"
        />
        {error ? (
          <div className="flex items-center justify-center gap-2 flex-col bg-red-600 text-white p-7 rounded-xl">
            <h1 className="text-3xl">ERROR:</h1>
            <h1>{error}</h1>
            <h2>Probeer later opnieuw</h2>
          </div>
        ) : (
          <>
            <div className={styles.search}>
              <h1 className={styles.HomeTitle}>Welkom</h1>
              <h2 className={styles.SecondTitle}>
                Bij World of Content Live Score
              </h2>
              <h3 className={styles.ThirdTitle}>
                Selecteer uw brand om verder te gaan
              </h3>
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
                  placeholder="Zoek uw brand...."
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
                        onClick={() => {
                          setInput(suggestion);
                          setSuggestions([]);
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
    const brands = data.data.reduce((array, item) => {
      if (array.includes(item.brand)) {
        return array;
      } else {
        return [...array, item.brand];
      }
    }, []);

    if (data.status === "error") {
      return {
        props: {
          error: "Data kan niet opgehaald worden",
        },
      };
    } else {
      return {
        props: {
          brandData: brands,
          alldata: data.data,
          error: null,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      props: { brands: null, error: error },
    };
  }
}

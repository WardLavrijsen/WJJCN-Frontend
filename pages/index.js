import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "../components/navbar";
import BrandCard from "../components/brandCard";
import { useState } from "react";

export default function Home({
  selectedBrand,
  selectedPage,
  brandData,
  alldata,
  error,
}) {
  const [brands, setBrands] = useState(brandData);
  const [allData, setAllData] = useState([]);
  console.log(allData);

  const [currentBrand, setCurrentBrand] = useState(selectedBrand);
  const [currentPage, setCurrentPage] = useState(selectedPage);

  const changeUrl = (brand) => {
    const search = `?brand=${brand.replace(" ", "-")}`;
    history.pushState(null, "", location.origin + search);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className={styles.main}>
        {error ? (
          <div className="flex items-center justify-center gap-2 flex-col bg-red-600 text-white p-7 rounded-xl">
            <h1 className="text-3xl">ERROR:</h1>
            <h1>{error}</h1>
            <h2>Probeer later opnieuw</h2>
          </div>
        ) : (
          <div className={styles.brandList}>
            <h1 className={styles.brandTitle}>Brands:</h1>
            {brands.map((brand) => (
              <button
                className={`${styles.brand} ${
                  brand == currentBrand ? styles.active : null
                }`}
                onClick={() => {
                  setCurrentBrand(brand);
                  changeUrl(brand);
                  setAllData(
                    alldata.filter((data) => {
                      return data.brand === currentBrand;
                    })
                  );
                }}
                key={brand}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
        {allData.map((brand) => (
          <div className={styles.brandList} key={brand.brand + brand.retailers}>
            <h1 className={styles.brandTitle}>{brand.retailers}</h1>
            {brand.products.map((product) => {
              return (
                <h1 className={styles.product} key={product.name}>
                  {product.name}
                </h1>
              );
            })}
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  let selectedBrand = null;
  let selectedPage = null;
  if (context.query.brand) {
    selectedBrand = context.query.brand.replace("-", " ");
  }
  if (context.query.page) {
    selectedPage = context.query.page;
  }
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
          selectedBrand,
          selectedPage,
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

import styles from "../../styles/Home.module.css";
import gridStyles from "../../styles/Grid.module.css";
import productStyles from "../../styles/Product.module.css";
import retailerProductBoxStyles from "../../styles/RetailerProductBox.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { Accordion, Card } from "flowbite-react";
import Link from "next/link";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import { useState } from "react";

export default function Product({ products, error }) {
  const router = useRouter();
  const { id } = router.query;

  const clickRetailer = (product, productsCurrentIndex) => {
    router.push(
      `/${router.query.id}/${router.query.retailer}?product=${product}&sort=${productsCurrentIndex}`, undefined, {shallow: true}
    );
  };

  console.log(products);

  const previousRetailer = () => {
    let index = router.query.sort;
    let productName;

    if (index==0)
    {
      productName = products[products.length-1].product;
      clickRetailer(productName, products.length-1)
    }
    else {
      productName = products[index-1].product;
      clickRetailer(productName, index-1)
    }
  };

  const nextRetailer = () => {
    let index = router.query.sort;
    let productName;

    if (index==products.length - 1)
    {
      productName = products[0].product;
      clickRetailer(productName, 0)
    }
    else {
      productName = products[+index + 1].product;
      clickRetailer(productName, +index + 1)
    }
  };

  const product = products.find((obj) => {
    if (router.query.product == null) {
      return Object.values(obj);
    }
    return obj.product === router.query.product;
  });

  return (
    <div>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={productStyles.main}>
        {error ? (
          <div className="flex items-center justify-center gap-2 flex-col bg-red-600 text-white p-7 rounded-xl">
            <h1 className="text-3xl">ERROR:</h1>
            <h1>{error}</h1>
            <h2>Probeer later opnieuw</h2>
          </div>
        ) : (
          <div className={gridStyles.parentProduct}>
            <div className={gridStyles.divRetailerCard}>
              <Link href="/">
                <img
                  className={styles.logo}
                  alt="WoC logo"
                  src="/images/w-logo.png"
                ></img>
              </Link>
              <div className={productStyles.displayCard}>
                <img
                  className={productStyles.retailerLogo}
                  alt="Retailer logo"
                  src="/images/retailer-logo.png"
                />
                <div className={productStyles.displayCardContainer}>
                  <div className={productStyles.displayCardContainerDiv1}>
                    <h5>{product.retailer}</h5>
                    <p>{product.score}% Similarity</p>
                    <div className={productStyles.progressBarContainer}>
                      <div
                        style={{
                          width: `${product.score}%`,
                          backgroundColor:
                            parseInt(product.score) >= 50
                              ? parseInt(product.score) >= 75
                                ? "#2ecc71"
                                : "#F1C40F"
                              : parseInt(product.score) >= 25
                              ? "#E67E22"
                              : "#E74C3C",
                        }}
                        className={retailerProductBoxStyles.progressBarInsert}
                      ></div>
                    </div>
                  </div>
                  <div className={productStyles.displayCardContainerDiv2}>
                    <button
                      className={
                        productStyles.displayCardContainerButtonPrevious
                      }
                      onClick={() => previousRetailer()}
                    >
                      Previous Retailer
                      <BsArrowUp className={productStyles.arrowUpIcon} />
                    </button>
                    <br></br>
                    <button onClick={() => nextRetailer()}>
                      Next Retailer
                      <BsArrowDown className={productStyles.arrowUpIcon} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <Card>
                {products.map((product) => {
                  return (
                    <div key={product._id.$oid}>
                      <button onClick={() => clickRetailer(product.product, products.findIndex(object => {
                        return object.product === product.product;
                      }))}>
                        {product.product}
                      </button>
                    </div>
                  );
                })}
              </Card>
              <br></br>
              <Accordion
                alwaysOpen={false}
                style={{ backgroundColor: "white" }}
              >
                {Object.entries(product.product_brand).map(([key, value]) => {
                  return (
                    <Accordion.Panel key={key}>
                      <Accordion.Title>
                        <div style={{ display: "flex" }}>
                          <h3>{key}:</h3>
                          <p>overeenkomst: ja/nee</p>
                        </div>
                      </Accordion.Title>
                      <Accordion.Content style={{ backgroundColor: "white" }}>
                        <div style={{ display: "flex" }}>
                          <div>
                            <h3>Product from WoC</h3>
                            <br></br>
                            <h6>Text:</h6>
                            <br></br>
                            <p>{value}</p>
                          </div>
                          <div>
                            <h3>Product from retailer</h3>
                            <br></br>
                            <h6>Text:</h6>
                            <br></br>
                            <p>{product.product_scraped[key]}</p>
                          </div>
                        </div>
                      </Accordion.Content>
                    </Accordion.Panel>
                  );
                })}
              </Accordion>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.headers.host;

  try {
    const res = await fetch(
      `http://${url}/api/product?name=${context.query.id}&retailer=${context.query.retailer}`
    );
    let data = await res.json();
    console.log("Fetched data...")
    const datametscore = data.data.map((product) => {
      let goed = 0;
      Object.entries(product.product_brand).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.join("") === product.product_scraped[key].join("")) {
            goed++;
          }
        }
        if (value === product.product_scraped[key]) {
          goed++;
        }
      });
      product.score = (
        (goed / Object.keys(product.product_brand).length) *
        100
      ).toFixed(2);

      return product;
    });
    data.data = datametscore;

    if (data.status === "error") {
      return {
        props: {
          error: "Data kan niet opgehaald worden",
        },
      };
    } else {
      return {
        props: { products: data.data, error: null },
      };
    }
  } catch (error) {
    return {
      error: error,
    };
  }
}

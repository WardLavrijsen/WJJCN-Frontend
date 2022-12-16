import Head from "next/head";

import { useState, useEffect } from "react";

import productStyles from "../../styles/product/Product.module.css";

import ProductPageMenu from "../../components/ProductPageMenu";
import ProductPageProducts from "../../components/ProductPageProducts";
import ProductPageResults from "../../components/ProductPageResults";
import ProductPageLiveScore from "../../components/ProductPageLiveScore";

import PieChartModel from "../../components/models/PieChartModel";

export default function Product({
  brandServer,
  retailerServer,
  productServer,
  products,
  error,
}) {
  const [brand, setBrand] = useState(brandServer);
  const [retailer, setRetailer] = useState(retailerServer);

  const allRetailers = [];
  products.forEach((product) => {
    if (!allRetailers.includes(product.retailer)) {
      allRetailers.push(product.retailer);
    }
  });

  const [currentProducts, setCurrentProducts] = useState(
    products.filter((product) => {
      return product.retailer === retailerServer;
    })
  );

  // const handleRetailerChange = (retailer) => {
  //   console.log(retailer);
  // };

  const [currentProduct, setCurrentProduct] = useState(
    products.find((product) => {
      return (
        product.retailer === retailerServer && product.product === productServer
      );
    })
  );

  const handleNextRetailer = () => {
    let nextindex;
    const index = allRetailers.indexOf(retailer);

    if (index == allRetailers.length - 1) {
      nextindex = 0;
    } else {
      nextindex = index + 1;
    }

    setRetailer(allRetailers[nextindex]);
    setCurrentProducts(
      products.filter((product) => {
        return product.retailer === allRetailers[nextindex];
      })
    );

    setCurrentProduct(null);

    window.history.pushState(
      "page2",
      "Title",
      `/${brand}/${allRetailers[nextindex]}`
    );
  };

  const handlePreviousRetailer = () => {
    let nextindex;
    const index = allRetailers.indexOf(retailer);

    if (index == 0) {
      nextindex = allRetailers.length - 1;
    } else {
      nextindex = index - 1;
    }

    setRetailer(allRetailers[nextindex]);
    setCurrentProducts(
      products.filter((product) => {
        return product.retailer === allRetailers[nextindex];
      })
    );

    setCurrentProduct(null);

    window.history.pushState(
      "page2",
      "Title",
      `/${brand}/${allRetailers[nextindex]}`
    );
  };

  const [active, setActive] = useState("Live Score");
  const [model, setModel] = useState(false);

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

      <main className={pageLoad ? productStyles.main : productStyles.Fadein}>
        {error ? (
          <div className="flex items-center justify-center gap-2 flex-col bg-red-600 text-white p-7 rounded-xl">
            <h1 className="text-3xl">ERROR:</h1>
            <h1>{error}</h1>
            <h2>Probeer later opnieuw</h2>
          </div>
        ) : (
          <div className={productStyles.parent}>
            <PieChartModel
              model={model}
              setModel={setModel}
              currentProduct={currentProduct}
            />
            <ProductPageMenu
              currentProducts={currentProducts}
              brand={brand}
              retailer={retailer}
              product={currentProduct}
              handleNextRetailer={handleNextRetailer}
              handlePreviousRetailer={handlePreviousRetailer}
            />
            <ProductPageProducts
              currentProducts={currentProducts}
              currentProduct={currentProduct}
              setCurrentProduct={setCurrentProduct}
            />
            <div className={productStyles.div3}>
              <button
                className={productStyles.tab2}
                style={
                  active === "Live Score"
                    ? { backgroundColor: "white", border: "1px solid black" }
                    : { backgroundColor: "#d8d8d8" }
                }
                onClick={() => setActive("Live Score")}
              >
                Live Score
              </button>
              <button
                className={productStyles.tab1}
                style={
                  active === "Results"
                    ? { backgroundColor: "white", border: "1px solid black" }
                    : { backgroundColor: "#d8d8d8" }
                }
                onClick={() => setActive("Results")}
              >
                Results
              </button>
              {currentProduct ? (
                <>
                  {currentProduct.history.length >= 1 ? (
                    <>
                      {active == "Live Score" ? (
                        <ProductPageLiveScore
                          setModel={setModel}
                          currentProduct={currentProduct}
                        />
                      ) : null}
                      {active == "Results" ? (
                        <ProductPageResults product={currentProduct} />
                      ) : null}
                    </>
                  ) : (
                    <h1 className="text-3xl flex h-full w-full items-center justify-center">
                      Product has no data
                    </h1>
                  )}
                </>
              ) : (
                <h1 className="text-3xl flex h-full w-full items-center justify-center">
                  Select a product
                </h1>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.headers.host;
  const id = context.query.id;
  const retailer = context.query.retailer;
  const product = context.query.product;

  try {
    const res = await fetch(
      `http://${url}/api/product?name=${context.query.id}&retailer=${context.query.retailer}`
    );
    let data = await res.json();

    if (data.status === "error") {
      return {
        props: {
          error: "Data kan niet opgehaald worden",
        },
      };
    } else {
      return {
        props: {
          brandServer: id,
          retailerServer: retailer,
          productServer: product || null,
          products: data.data,
          error: null,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}

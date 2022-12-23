import Link from "next/link";
import { useState } from "react";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// import productStyles from "../styles/product/Product.module.css";s
import productsStyles from "../styles/product/ProductResults.module.css";

export default function ProductPageResults({ product }) {
  const [show, setShow] = useState(
    Object.entries(product.history[product.history.length - 1].product_scraped)
      .map(([key, value]) => {
        if (value.score < 75) {
          return key;
        } else {
          return null;
        }
      })
      .filter((item) => {
        return item != null;
      })
  );

  return (
    <div className={productsStyles.allatributes}>
      {Object.entries(
        product.history[product.history.length - 1].product_scraped
      ).map(([key, value]) => {
        return (
          <>
            <div key={key} className={productsStyles.atribute}>
              <div>
                <h1 className={productsStyles.ProductTitle}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h1>
              </div>
              <div className={productsStyles.backdiv}>
                <h1
                  style={{
                    backgroundColor:
                      value.score >= 50
                        ? value.score >= 75
                          ? "#2ecc71"
                          : "#F1C40F"
                        : value.score >= 25
                        ? "#E67E22"
                        : "#E74C3C",
                  }}
                  className={productsStyles.scorePoint}
                >
                  {value.score.toFixed(2)}%
                </h1>
                <h1
                  style={{
                    backgroundColor:
                      value.text == "Not found" ? "#E74C3C" : "#2ECC71",
                  }}
                  className={productsStyles.scorePoint}
                >
                  {value.text == "Not found" ? "Not Found" : "Found"}
                </h1>
                <button
                  onClick={() => {
                    if (show.includes(key)) {
                      setShow(show.filter((el) => el !== key));
                    } else {
                      setShow([...show, key]);
                    }
                  }}
                  className={productsStyles.arrowDownButton}
                >
                  <MdOutlineKeyboardArrowDown
                    style={
                      show.includes(key)
                        ? { transform: "rotate(180deg)" }
                        : { transform: "rotate(0deg)" }
                    }
                    className={productsStyles.arrowDownButton}
                  />
                </button>
              </div>
            </div>
            {show.includes(key) ? (
              <div className={productsStyles.openItem}>
                <div className={productsStyles.titleBox}>
                  <h1 className={productsStyles.itemTitle}>
                    World Of Content:
                  </h1>
                  <p className={productsStyles.compareValues}>
                    {Array.isArray(
                      product.history[product.history.length - 1].product_brand[
                        key
                      ]
                    ) ? (
                      <>
                        {product.history[
                          product.history.length - 1
                        ].product_brand[key].map((el, index) => {
                          return (
                            <p
                              key={el}
                              className={productsStyles.compareValues}
                            >
                              {index + 1}. {el}
                            </p>
                          );
                        })}
                      </>
                    ) : (
                      product.history[product.history.length - 1].product_brand[
                        key
                      ]
                    )}
                  </p>
                </div>
                <div className={productsStyles.titleBox}>
                  <h1 className={productsStyles.itemTitle}>
                    Scraped from website:
                  </h1>

                  {Array.isArray(value.text) ? (
                    <>
                      {value.text.map((el, index) => {
                        return (
                          <p key={el} className={productsStyles.compareValues}>
                            {index + 1}. {el}
                          </p>
                        );
                      })}
                    </>
                  ) : (
                    <p className={productsStyles.compareValues}>{value.text}</p>
                  )}
                </div>
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
}

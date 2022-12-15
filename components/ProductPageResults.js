import Link from "next/link";
import { useState } from "react";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// import productStyles from "../styles/product/Product.module.css";s
import productsStyles from "../styles/product/ProductResults.module.css";

const arrayToString = (array) => {
  return (
    <ul>
      {array.map((el) => {
        return (
          <li className={productsStyles.liel} key={el}>
            {el}
          </li>
        );
      })}
    </ul>
  );
};

export default function ProductPageResults({ product }) {
  const [show, setShow] = useState("");

  return (
    <div className={productsStyles.allatributes}>
      {Object.entries(
        product.history[product.history.length - 1].product_scraped
      ).map(([key, value]) => {
        return (
          <>
            <div key={key} className={productsStyles.atribute}>
              <div>
                <h1 className={productsStyles.ProductTitle}>{key}</h1>
              </div>
              <div className={productsStyles.backdiv}>
                <h1
                  style={{
                    backgroundColor: value.equal_to_scraped
                      ? "#2ECC71"
                      : value.text == "Not found"
                      ? "#E74C3C"
                      : "#E67E22",
                  }}
                  className={productsStyles.scorePoint}
                >
                  {value.equal_to_scraped
                    ? "Correct"
                    : value.text == "Not found"
                    ? "Not found"
                    : "Not correct"}
                </h1>
                <button
                  onClick={() => {
                    if (show === key) {
                      setShow("");
                    } else {
                      setShow(key);
                    }
                  }}
                  className={productsStyles.arrowDownButton}
                >
                  <MdOutlineKeyboardArrowDown
                    style={
                      show == key
                        ? { transform: "rotate(180deg)" }
                        : { transform: "rotate(0deg)" }
                    }
                    className={productsStyles.arrowDownButton}
                  />
                </button>
              </div>
            </div>
            {show === key ? (
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
                    )
                      ? arrayToString(
                          product.history[product.history.length - 1]
                            .product_brand[key]
                        )
                      : product.history[product.history.length - 1]
                          .product_brand[key]}
                  </p>
                </div>
                <div className={productsStyles.titleBox}>
                  <h1 className={productsStyles.itemTitle}>
                    Scraped from website:
                  </h1>
                  <p className={productsStyles.compareValues}>
                    {Array.isArray(value.text)
                      ? arrayToString(value.text)
                      : value.text}
                  </p>
                </div>
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
}

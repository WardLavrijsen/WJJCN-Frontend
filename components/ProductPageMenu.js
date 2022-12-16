import Link from "next/link";

// import productStyles from "../styles/product/Product.module.css";s
import productMenuStyles from "../styles/product/ProductMenu.module.css";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";
import { BsChevronDoubleRight } from "react-icons/bs";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";

export default function ProductPageMenu({
  brand,
  retailer,
  product,
  handleNextRetailer,
  handlePreviousRetailer,
  currentProducts,
}) {
  const scoreArray = currentProducts
    .map((product) => {
      if (product.history.length > 0) {
        return product.history[product.history.length - 1].score;
      } else {
        return "Geen score";
      }
    })
    .filter((score) => score !== "Geen score");

  const retailerScore =
    (scoreArray.reduce((a, b) => a + b, 0) / scoreArray.length).toFixed(2) || 0;

  return (
    <div className={productMenuStyles.div1}>
      <Link style={{ cursor: "pointer" }} href={"/"}>
        <img
          style={{ cursor: "pointer" }}
          className={styles.logo}
          alt="world of content logo"
          src="/images/w-logo.png"
        />
      </Link>
      <h3 className={productMenuStyles.breadcrums}>
        <Link href="/" className={productMenuStyles.Link}>
          <BiHomeAlt
            style={{ cursor: "pointer" }}
            className={productMenuStyles.homeLogo}
          />
        </Link>
        <BsChevronDoubleRight className={productMenuStyles.homeLogo} />
        <Link href={"/"}>
          <u style={{ cursor: "pointer" }}>{brand}</u>
        </Link>
        <BsChevronDoubleRight className={productMenuStyles.homeLogo} />
        <Link href={"/" + brand}>
          <u style={{ cursor: "pointer" }}>{retailer}</u>
        </Link>
        <BsChevronDoubleRight className={productMenuStyles.homeLogo} />
        <p>{product ? product.product : ""}</p>
      </h3>
      <div className={productMenuStyles.statusbox}>
        <div>
          <div>
            <h1 className={productMenuStyles.titleBox}>{retailer}</h1>
            <div className={productMenuStyles.progressBarBox}>
              <div className={productMenuStyles.progressBar}>
                <div
                  style={{
                    width: `${retailerScore}%`,
                    backgroundColor:
                      parseInt(retailerScore) >= 50
                        ? parseInt(retailerScore) >= 75
                          ? "#2ecc71"
                          : "#F1C40F"
                        : parseInt(retailerScore) >= 25
                        ? "#E67E22"
                        : "#E74C3C",
                  }}
                  className={productMenuStyles.progressBarInsert}
                ></div>
              </div>
              <h1 className={productMenuStyles.titleBox}>{retailerScore}%</h1>
            </div>
          </div>
        </div>
        <div className={productMenuStyles.retailerSelecter}>
          <button onClick={handlePreviousRetailer}>
            <AiOutlineArrowLeft className={productMenuStyles.arrowReailers} />
          </button>
          <h1 className={productMenuStyles.TitleRetailers}>Retailer</h1>
          <button onClick={handleNextRetailer}>
            <AiOutlineArrowRight className={productMenuStyles.arrowReailers} />
          </button>
        </div>
      </div>
    </div>
  );
}

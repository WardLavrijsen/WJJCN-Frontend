import Link from "next/link";

// import productStyles from "../styles/product/Product.module.css";s
import productMenuStyles from "../styles/product/ProductMenu.module.css";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";

export default function ProductPageMenu({ brand, retailer, product }) {
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
      <div className={productMenuStyles.statusbox}></div>
    </div>
  );
}

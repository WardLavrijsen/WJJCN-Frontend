import Link from "next/link";
import { useState } from "react";

// import productStyles from "../styles/product/Product.module.css";s
import productsStyles from "../styles/product/ProductLiveScore.module.css";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

export default function ProductPageLiveScore({ currentProduct, setModel }) {
  return (
    <>
      <div className={productsStyles.parent}>
        <button onClick={() => setModel(true)} className={productsStyles.div1}>
          <PieChart
            score={
              currentProduct.history[currentProduct.history.length - 1].score
            }
          />
        </button>
        <div className={productsStyles.div2}>
          <BarChart currentProduct={currentProduct} />
        </div>
        <div className={productsStyles.div3}>
          <LineChart currentProduct={currentProduct} />
        </div>
      </div>
    </>
  );
}

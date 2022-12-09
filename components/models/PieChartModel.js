import { BiX } from "react-icons/bi";
import PieChart from "../PieChart";

import productsStyles from "../../styles/product/models/PieChartModel.module.css";

export default function PieChartModel({ model, setModel, currentProduct }) {
  if (model) {
    return (
      <>
        <button
          onClick={() => {
            setModel(false);
          }}
          className={productsStyles.backgroundblur}
        ></button>
        <div className={productsStyles.model}>
          <button
            onClick={() => setModel(false)}
            className={productsStyles.closeIcon}
          >
            <BiX />
          </button>
          <div className={productsStyles.modelInfo}>
            <h1
              style={{
                fontWeight: 600,
                fontSize: "1.5rem",
              }}
            >
              {currentProduct.product}
            </h1>
            <div className={productsStyles.elements}>
              {Object.entries(
                currentProduct.history[currentProduct.history.length - 1]
                  .product_scraped
              ).map(([key, value]) => {
                return (
                  <h3 style={{ fontWeight: 600 }} key={value}>
                    {key}
                    {": "}
                    <span
                      style={{
                        color: value.equal_to_scraped ? "green" : "red",
                        fontWeight: 400,
                      }}
                    >
                      {value.equal_to_scraped ? "is found" : "is not found"}
                    </span>
                  </h3>
                );
              })}
            </div>
          </div>
          <div className={productsStyles.modelGraph}>
            <PieChart
              score={
                currentProduct.history[currentProduct.history.length - 1].score
              }
            />
          </div>
        </div>
      </>
    );
  }
}

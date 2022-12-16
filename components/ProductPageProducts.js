import Link from "next/link";

// import productStyles from "../styles/product/Product.module.css";s
import productsStyles from "../styles/product/ProductProducts.module.css";

export default function ProductPageProducts({
  currentProduct,
  currentProducts,
  setCurrentProduct,
}) {
  return (
    <div className={productsStyles.div2}>
      <div className={productsStyles.TitleBox}>
        <h1 className={productsStyles.title}>Products:</h1>
      </div>
      <div className={productsStyles.productsBox}>
        {currentProducts.length == 0 ? (
          <h1>Geen producten</h1>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <button
                  onClick={() => {
                    setCurrentProduct(product);
                    window.history.pushState(
                      "page2",
                      "Title",
                      `/${product.brand}/${product.retailer}?product=${product.product}`
                    );
                  }}
                  key={product._id["$oid"]}
                  className={
                    currentProduct
                      ? product._id == currentProduct._id
                        ? productsStyles.productActive
                        : productsStyles.productTitle
                      : productsStyles.productTitle
                  }
                >
                  {product.product}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

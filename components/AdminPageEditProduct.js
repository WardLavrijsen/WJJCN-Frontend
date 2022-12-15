import adminSytles from "../styles/admin/AdminAddRetailers.module.css";
import adminGeneral from "../styles/Admin.module.css";

import { useEffect, useState } from "react";

export default function AdminPageEditProduct({
  active,
  setActive,

  token,

  setError,
  setErrorState,
  setErrorColor,

  selectedProduct,
}) {
  const [producturl, setProducturl] = useState("");
  const product = selectedProduct;

  useEffect(() => {
    if (selectedProduct) {
      setProducturl(selectedProduct.product_url);
    }
  }, [selectedProduct]);

  const handleAddRetailer = async (e) => {
    e.preventDefault();

    product.product_url = producturl;

    const response = await fetch("/api/updateUrl", {
      method: "POST",
      body: JSON.stringify({
        product: product,
        token: token,
      }),
    });

    if (response.status === 200) {
      setError("Proudct is updated!");
      setErrorState(true);
      setErrorColor("#27ae60");

      setActive("products");

      setTimeout(() => {
        setErrorState(false);
      }, 3000);
    } else {
      setError("Something went wrong!");
      setErrorState(true);
      setErrorColor("#c0392b");

      setTimeout(() => {
        setErrorState(false);
      }, 3000);
    }
  };

  return (
    <div
      className={adminGeneral.infobox}
      style={
        active === "editproduct" ? { display: "block" } : { display: "none" }
      }
    >
      <div className={adminGeneral.titlebox}>
        <h1 className={adminGeneral.titleintitlebox}>Edit Product URL</h1>
        <div>
          <button
            onClick={() => setActive("products")}
            className={adminGeneral.buttonintitlebox}
          >
            Go Back
          </button>
        </div>
      </div>
      <form
        onSubmit={handleAddRetailer}
        className={adminSytles.addRetailerForm}
      >
        <div className={adminSytles.inputDiv}>
          <label htmlFor="name">Name:</label>
          <input
            value={producturl}
            onChange={(e) => {
              setProducturl(e.target.value);
            }}
            type="text"
            name="name"
            id="name"
            required
          ></input>
        </div>

        <input
          className={adminSytles.addRetailerSubmitButton}
          type="submit"
          name="submitbutton"
          value="Edit Product"
        ></input>
      </form>
    </div>
  );
}

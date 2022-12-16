import adminSytles from "../styles/admin/AdminProducts.module.css";
import adminGeneral from "../styles/Admin.module.css";

import { useState } from "react";

import { BsPencilSquare } from "react-icons/bs";

export default function AdminPageProducts({
  active,
  setActive,
  products,
  setSelectedProduct,
}) {
  const brands = [];
  const retailers = [];

  const [producten, setProducten] = useState([...products]);

  const [brand, setBrand] = useState("all");
  const [retailer, setRetailer] = useState("all");

  products.forEach((product) => {
    if (!brands.includes(product.brand)) {
      brands.push(product.brand);
    }
    if (!retailers.includes(product.retailer)) {
      retailers.push(product.retailer);
    }
  });

  const setSelected = (product) => {
    setSelectedProduct(product);
  };

  const changeBrand = (e) => {
    setBrand(e.target.value);

    if (e.target.value === "all" && retailer === "all") {
      setProducten([...products]);
    } else if (e.target.value === "all" && retailer !== "all") {
      setProducten([
        ...products.filter((product) => product.retailer === retailer),
      ]);
    } else if (e.target.value !== "all" && retailer === "all") {
      setProducten([
        ...products.filter((product) => product.brand === e.target.value),
      ]);
    } else {
      setProducten([
        ...products.filter(
          (product) =>
            product.brand === e.target.value && product.retailer === retailer
        ),
      ]);
    }
  };

  const changeRetailer = (e) => {
    setRetailer(e.target.value);

    if (e.target.value === "all" && brand === "all") {
      setProducten([...products]);
    } else if (e.target.value === "all" && brand !== "all") {
      setProducten([...products.filter((product) => product.brand === brand)]);
    } else if (e.target.value !== "all" && brand === "all") {
      setProducten([
        ...products.filter((product) => product.retailer === e.target.value),
      ]);
    } else {
      setProducten([
        ...products.filter(
          (product) =>
            product.brand === brand && product.retailer === e.target.value
        ),
      ]);
    }
  };

  return (
    <div
      className={adminGeneral.infobox}
      style={active === "products" ? { display: "block" } : { display: "none" }}
    >
      <div className={adminGeneral.titlebox}>
        <h1 className={adminGeneral.titleintitlebox}>Products</h1>
      </div>

      <div className={adminSytles.selecterBox}>
        <div className={adminSytles.selectBrand}>
          <h1>Brand:</h1>
          <select
            value={brand}
            onChange={changeBrand}
            className={adminSytles.selectbox}
            name="brand"
            id="brand"
          >
            <option className={adminSytles.SelectOption} value="all">
              All
            </option>
            {brands.map((brand) => {
              return (
                <option
                  className={adminSytles.SelectOption}
                  key={brand}
                  value={brand}
                >
                  {brand}
                </option>
              );
            })}
          </select>
        </div>
        <div className={adminSytles.selectBrand}>
          <h1>Retailer:</h1>
          <select
            value={retailer}
            onChange={changeRetailer}
            className={adminSytles.selectbox}
            name="retailer"
            id="retailer"
          >
            <option className={adminSytles.SelectOption} value="all">
              All
            </option>
            {retailers.map((retailer) => {
              return (
                <option
                  className={adminSytles.SelectOption}
                  key={retailer}
                  value={retailer}
                >
                  {retailer}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className={adminSytles.productHeaderBox}>
        <div className={adminSytles.productHeaderBoxBrand}>Brand</div>
        <div className={adminSytles.productHeaderBoxRetailer}>Retailer</div>
        <div className={adminSytles.productHeaderBoxProduct}>Product</div>
        <div className={adminSytles.productHeaderBoxEdit}>Edit Link</div>
      </div>
      <div className={adminSytles.productsBox}>
        {producten.map((product) => {
          return (
            <div key={product._id["$oid"]} className={adminSytles.productBox}>
              <div className={adminSytles.productBoxBrand}>
                <h1>{product.brand}</h1>
              </div>
              <div className={adminSytles.productBoxRetailer}>
                <h1>{product.retailer}</h1>
              </div>
              <div className={adminSytles.productBoxProduct}>
                <h1>{product.product}</h1>
              </div>
              <div className={adminSytles.productBoxEdit}>
                <button
                  onClick={() => {
                    setActive("editproduct");
                    setSelected(product);
                  }}
                  className={adminSytles.EditButton}
                >
                  <BsPencilSquare />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import adminSytles from "../styles/admin/AdminBrands.module.css";
import adminGeneral from "../styles/Admin.module.css";

import { useRouter } from "next/router";
import { useState } from "react";

export default function AdminPageBrands({
  active,
  setActive,

  token,
  setError,
  setErrorState,
  setErrorColor,

  brands,
  setBrands,
}) {
  const deleteBrand = async (id) => {
    const response = await fetch("/api/deletebrand", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        token: token,
      }),
    });

    if (response.status === 200) {
      setError("Brand is deleted!");
      setErrorState(true);
      setErrorColor("#27ae60");

      setBrands(brands.filter((r) => r._id["$oid"] !== id));

      setTimeout(() => {
        setErrorState(false);
      }, 2000);
    } else {
      setError("Something went wrong!");
      setErrorState(true);
      setErrorColor("#c0392b");

      setTimeout(() => {
        setErrorState(false);
      }, 2000);
    }
  };

  return (
    <div
      className={adminGeneral.infobox}
      style={active === "brands" ? { display: "block" } : { display: "none" }}
    >
      <div className={adminGeneral.titlebox}>
        <h1 className={adminGeneral.titleintitlebox}>Brands</h1>
        <div>
          <button
            className={adminGeneral.buttonintitlebox}
            onClick={() => {
              setActive("addBrand");
            }}
          >
            Add Brand
          </button>
        </div>
      </div>

      <div className={adminGeneral.headerbox}>
        <div className={adminSytles.headerboxName}>Name</div>
        <div className={adminSytles.headerboxTotalRetailers}>
          Total Retailers
        </div>
        <div className={adminSytles.headerboxRetailers}>First 2 Retailers</div>
        <div className={adminSytles.headerboxEdit}>Edit</div>
        <div className={adminSytles.headerboxEdit}>Delete</div>
      </div>
      <div className={adminGeneral.retailersbox}>
        {brands.map((brand) => {
          console.log(brand);
          const retailers = brand.retailers
            .map((retailer) => retailer.name)
            .slice(0, 2)
            .join(", ");

          return (
            <div key={brand._id["$oid"]} className={adminGeneral.retailerbox}>
              <div className={adminSytles.brandboxName}>
                <h4 className={adminSytles.brandTitle}>{brand.name}</h4>
              </div>
              <div className={adminSytles.brandboxTotaalRetailers}>
                {brand.retailers.length} Retailers
              </div>
              <div className={adminSytles.brandboxRetailers}>{retailers}</div>
              <div className={adminSytles.brandboxEditButton}>
                <button className={adminSytles.EditButton}>Edit</button>
              </div>
              <div className={adminSytles.brandboxEditButton}>
                <button
                  className={adminSytles.DeleteButton}
                  onClick={deleteBrand.bind(this, brand._id["$oid"])}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

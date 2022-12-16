import adminSytles from "../styles/admin/AdminRetailers.module.css";
import adminGeneral from "../styles/Admin.module.css";

import { useRouter } from "next/router";
import { useState } from "react";

import { BsFillTrashFill, BsPlusCircle } from "react-icons/bs";

export default function AdminPageRetailers({
  active,
  setActive,
  orgRetailers,

  token,
  setError,
  setErrorState,
  setErrorColor,

  retailers,
  setRetailers,
}) {
  const router = useRouter();

  const [activeInput, setActiveInput] = useState("");

  const updateRetailers = async () => {
    const response = await fetch("/api/updateretailers", {
      method: "POST",
      body: JSON.stringify({
        retailers: retailers.map((r) => {
          r.scrape = r.scrape ? "true" : "false";
          return r;
        }),
        token: token,
      }),
    });
    if (response.status === 200) {
      setError("Retailers are updated!");
      setErrorState(true);
      setErrorColor("#27ae60");

      setTimeout(() => {
        setErrorState(false);
        router.reload(window.location.pathname);
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

  const deleteRetailer = async (id) => {
    const response = await fetch("/api/deleteretailer", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        token: token,
      }),
    });

    if (response.status === 200) {
      setError("Retailer is deleted!");
      setErrorState(true);
      setErrorColor("#27ae60");

      setRetailers(retailers.filter((r) => r._id["$oid"] !== id));

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
      style={
        active === "retailers" ? { display: "block" } : { display: "none" }
      }
    >
      <div className={adminGeneral.titlebox}>
        <h1 className={adminGeneral.titleintitlebox}>Retailers</h1>
        <div>
          <button
            style={{ marginRight: "1rem" }}
            className={adminGeneral.buttonintitlebox}
            onClick={() => {
              setActive("addRetailer");
              setRetailers(JSON.parse(JSON.stringify(orgRetailers)));
            }}
          >
            Add
          </button>
          <button
            style={{ marginRight: "1rem" }}
            className={adminGeneral.buttonintitlebox}
            onClick={() => {
              setRetailers(JSON.parse(JSON.stringify(orgRetailers)));
            }}
          >
            Reset
          </button>
          <button
            onClick={updateRetailers}
            className={adminGeneral.buttonintitlebox}
          >
            Save
          </button>
        </div>
      </div>

      <div className={adminGeneral.headerbox}>
        <div className={adminSytles.headerboxScrape}>Scrape</div>
        <div className={adminSytles.headerboxName}>Name</div>
        <div className={adminSytles.headerboxUrl}>Scrape URL</div>
        <div className={adminSytles.headerboxDelete}>Delete</div>
      </div>
      <div className={adminGeneral.retailersbox}>
        {retailers.map((retailer, index) => {
          return (
            <div key={index} className={adminGeneral.retailerbox}>
              <div className={adminSytles.retailerboxScrape}>
                <input
                  checked={retailer.scrape}
                  className={adminGeneral.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    const newRetailers = [...retailers];
                    newRetailers[index].scrape = e.target.checked;
                    setRetailers(newRetailers);
                  }}
                />
              </div>
              <div className={adminSytles.retailerboxName}>
                {activeInput == retailer._id["$oid"] + retailer.name ? (
                  <input
                    value={retailer.name}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setActiveInput("");
                      }
                    }}
                    className={adminSytles.retailerboxNameInput}
                    type="text"
                    onChange={(e) => {
                      const newRetailers = [...retailers];
                      newRetailers[index].name = e.target.value;
                      setRetailers(newRetailers);
                    }}
                  />
                ) : (
                  <h1
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setActiveInput(retailer._id["$oid"] + retailer.name)
                    }
                  >
                    {retailer.name}
                  </h1>
                )}
              </div>
              <div className={adminSytles.retailerboxUrl}>
                {activeInput ==
                retailer._id["$oid"] + retailer.url_to_scrape ? (
                  <input
                    value={retailer.url_to_scrape}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setActiveInput("");
                      }
                    }}
                    className={adminSytles.retailerboxNameInput}
                    type="text"
                    onChange={(e) => {
                      const newRetailers = [...retailers];
                      newRetailers[index].url_to_scrape = e.target.value;
                      setRetailers(newRetailers);
                    }}
                  />
                ) : (
                  <h1
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setActiveInput(
                        retailer._id["$oid"] + retailer.url_to_scrape
                      )
                    }
                  >
                    {retailer.url_to_scrape}
                  </h1>
                )}
              </div>

              <div className={adminSytles.retailerboxDelete}>
                <button
                  className={adminSytles.DeleteButton}
                  onClick={deleteRetailer.bind(this, retailer._id["$oid"])}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

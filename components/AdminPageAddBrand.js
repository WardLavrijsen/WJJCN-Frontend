import adminSytles from "../styles/admin/AdminAddBrand.module.css";
import adminGeneral from "../styles/Admin.module.css";

export default function AdminPageAddRetailer({
  active,
  setActive,
  retailers,
  token,

  setError,
  setErrorState,
  setErrorColor,

  brands,
  setBrands,
}) {
  const handleAddBrand = async (e) => {
    e.preventDefault();
    const retailers = [];
    Array.from(e.target.elements).forEach((element) => {
      if (element.type === "checkbox") {
        if (element.checked) {
          retailers.push(element.value);
        }
      }
    });

    const response = await fetch("/api/addbrand", {
      method: "POST",
      body: JSON.stringify({
        name: e.target[0].value,
        retailers: retailers,
        token: token,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      const newBrand = {
        _id: data.data,
        name: e.target[0].value,
        retailers: retailers,
      };

      setBrands([...brands, newBrand]);
      setError("Brand is added!");
      setErrorState(true);
      setErrorColor("#27ae60");

      setActive("brands");

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
      style={active === "addBrand" ? { display: "block" } : { display: "none" }}
    >
      <div className={adminGeneral.titlebox}>
        <h1 className={adminGeneral.titleintitlebox}>Add Brand</h1>
        <div>
          <button
            onClick={() => setActive("brands")}
            className={adminGeneral.buttonintitlebox}
          >
            Go Back
          </button>
        </div>
      </div>
      <form onSubmit={handleAddBrand} className={adminSytles.addRetailerForm}>
        <div className={adminSytles.inputDivName}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" required></input>
        </div>
        <div className={adminSytles.inputDivRetailers}>
          <h1 className={adminSytles.retailersLabel} htmlFor="name">
            Retailers:
          </h1>
          <div className={adminSytles.totalRetailersBox}>
            {[...retailers].map((retailer) => {
              return (
                <div
                  key={retailer._id["$oid"]}
                  className={adminSytles.retailersInFlexBox}
                >
                  <input
                    value={retailer._id["$oid"]}
                    className={adminSytles.checkmark}
                    type="checkbox"
                  />
                  <h4 className={adminSytles.RetailerName}>{retailer.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
        <input
          className={adminSytles.addRetailerSubmitButton}
          type="submit"
          name="submitbutton"
          value="Add Brand"
        ></input>
      </form>
    </div>
  );
}

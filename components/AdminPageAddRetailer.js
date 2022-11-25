import adminSytles from "../styles/admin/AdminAddRetailers.module.css";
import adminGeneral from "../styles/Admin.module.css";

export default function AdminPageAddRetailer({
  active,
  setActive,

  token,

  setError,
  setErrorState,
  setErrorColor,

  retailers,
  setRetailers,
}) {
  const handleAddRetailer = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/addretailer", {
      method: "POST",
      body: JSON.stringify({
        scrape: e.target[0].checked ? "true" : "false",
        name: e.target[1].value,
        base_url: e.target[2].value,
        url_to_scrape: e.target[3].value,
        token: token,
      }),
    });

    const data = await response.json();

    const retailer = {
      _id: data.data,
      scrape: e.target[0].checked,
      name: e.target[1].value,
      base_url: e.target[2].value,
      url_to_scrape: e.target[3].value,
    };

    if (response.status === 200) {
      setError("Retailer is toegevoegd!");
      setErrorState(true);
      setErrorColor("#27ae60");

      setRetailers([...retailers, retailer]);

      setActive("retailers");

      setTimeout(() => {
        setErrorState(false);
      }, 3000);
    }
  };

  return (
    <div
      className={adminGeneral.infobox}
      style={
        active === "addRetailer" ? { display: "block" } : { display: "none" }
      }
    >
      <div className={adminGeneral.titlebox}>
        <h1 className={adminGeneral.titleintitlebox}>Add Retailer</h1>
        <div>
          <button
            onClick={() => setActive("retailers")}
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
          <label htmlFor="scrape">Scrape:</label>
          <input
            className={adminGeneral.checkbox}
            type="checkbox"
            name="scrape"
            id="scrape"
          ></input>
        </div>
        <div className={adminSytles.inputDiv}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" required></input>
        </div>
        <div className={adminSytles.inputDiv}>
          <label htmlFor="base-url">Base-URL:</label>
          <input type="url" name="base-url" id="base-url" required></input>
        </div>
        <div className={adminSytles.inputDiv}>
          <label htmlFor="scrape-url">Scrape-URL:</label>
          <input type="url" name="scrape-url" id="scrape-url" required></input>
        </div>
        <input
          className={adminSytles.addRetailerSubmitButton}
          type="submit"
          name="submitbutton"
          value="Add Retailer"
        ></input>
      </form>
    </div>
  );
}

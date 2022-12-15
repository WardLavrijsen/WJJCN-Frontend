import adminSytles from "../styles/admin/AdminScraper.module.css";
import adminGeneral from "../styles/Admin.module.css";

import { useRouter } from "next/router";
import { useState } from "react";

import { BsFillXCircleFill, BsCheckCircleFill, BsX } from "react-icons/bs";

export default function AdminPageScraper({
  active,
  setActive,
  logs,
  setErrorForErrorPage,
}) {
  const router = useRouter();

  return (
    <div
      className={adminGeneral.infobox}
      style={active === "scraper" ? { display: "block" } : { display: "none" }}
    >
      <div className={adminGeneral.titlebox}>
        <h1 className={adminGeneral.titleintitlebox}>Scraper</h1>
        {logs.length >= 1 ? (
          <h3 className={adminSytles.savedintitlebox}>
            Last scraped on: {logs[0].date_run}
          </h3>
        ) : null}
      </div>
      <div className={adminGeneral.headerbox}>
        <div className={adminSytles.headerboxStatus}>Status</div>
        <div className={adminSytles.headerboxRetailerName}>Name</div>
        <div className={adminSytles.headerboxStep}>Step 1</div>
        <div className={adminSytles.headerboxStep}>Step 2</div>
        <div className={adminSytles.headerboxStep}>Step 3</div>
        <div className={adminSytles.headerboxStep}>Step 4</div>
      </div>
      <div className={adminGeneral.retailersbox}>
        {logs.length >= 1 ? (
          <>
            {logs.map((retailer) => {
              {
                if (
                  retailer.steps.link_crawling.status &&
                  retailer.steps.link_check.status &&
                  retailer.steps.product_fetch_compare.status &&
                  retailer.steps.save_to_database.status
                ) {
                  retailer.isgood = true;
                } else {
                  retailer.isgood = false;
                }
              }
              return (
                <div
                  key={retailer._id["$oid"]}
                  className={adminGeneral.retailerbox}
                >
                  <div className={adminSytles.scraperboxStatus}>
                    <div>
                      {retailer.isgood ? (
                        <BsCheckCircleFill className={adminSytles.okicon} />
                      ) : (
                        <BsFillXCircleFill className={adminSytles.erroricon} />
                      )}
                    </div>
                  </div>
                  <div className={adminSytles.scraperboxName}>
                    {retailer.retailer}
                  </div>
                  <div className={adminSytles.scraperboxStep}>
                    {retailer.steps.link_crawling.status ? (
                      <BsCheckCircleFill className={adminSytles.okicon} />
                    ) : (
                      <button
                        onClick={() => {
                          setErrorForErrorPage(
                            retailer.steps.link_crawling.error
                          );
                          setActive("error");
                        }}
                        className={adminSytles.errorBox}
                      >
                        <BsX className={adminSytles.erroriconsmall} />
                        Info
                      </button>
                    )}
                  </div>
                  <div className={adminSytles.scraperboxStep}>
                    {retailer.steps.link_check.status ? (
                      <BsCheckCircleFill className={adminSytles.okicon} />
                    ) : (
                      <button
                        onClick={() => {
                          setErrorForErrorPage(retailer.steps.link_check.error);
                          setActive("error");
                        }}
                        className={adminSytles.errorBox}
                      >
                        <BsX className={adminSytles.erroriconsmall} />
                        Info
                      </button>
                    )}
                  </div>
                  <div className={adminSytles.scraperboxStep}>
                    {retailer.steps.product_fetch_compare.status ? (
                      <BsCheckCircleFill className={adminSytles.okicon} />
                    ) : (
                      <button
                        onClick={() => {
                          setErrorForErrorPage(
                            retailer.steps.product_fetch_compare.error
                          );
                          setActive("error");
                        }}
                        className={adminSytles.errorBox}
                      >
                        <BsX className={adminSytles.erroriconsmall} />
                        Info
                      </button>
                    )}
                  </div>
                  <div className={adminSytles.scraperboxStep}>
                    {retailer.steps.save_to_database.status ? (
                      <BsCheckCircleFill className={adminSytles.okicon} />
                    ) : (
                      <button
                        onClick={() => {
                          setErrorForErrorPage(
                            retailer.steps.save_to_database.error
                          );
                          setActive("error");
                        }}
                        className={adminSytles.errorBox}
                      >
                        <BsX className={adminSytles.erroriconsmall} />
                        Info
                      </button>
                    )}
                  </div>
                </div>
              );
            })}{" "}
          </>
        ) : (
          <h1
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontSize: "2rem",
            }}
          >
            No logs found!
          </h1>
        )}
      </div>
    </div>
  );
}

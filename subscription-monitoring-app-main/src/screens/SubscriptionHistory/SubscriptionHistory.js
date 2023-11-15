import React from "react";
import Template from "../../components/Template/Template";
// import Example from "../../components/Table";
import SubHistory from "./SubHistory";

const SubscriptionHistory = () => {
  return (
    <>
      <Template>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/images/subs.png"}
            className="d-none d-lg-inline"
            alt="logosubs"
          />
          <span
            className="h3 text-gray-800 pl-3 pt-2"
            style={{
              display: "inline-flex",
              verticalAlign: "middle",
              alignItems: "center",
              minHeight: "12vh",
            }}
          >
            Subscription Edit History
          </span>
        </div>
        {/* <div class="card text-danger">
          <div class="card-header">All Subscriptions</div>
        </div> */}

        <SubHistory />
      </Template>
    </>
  );
};

export default SubscriptionHistory;

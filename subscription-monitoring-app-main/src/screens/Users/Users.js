import React from "react";
import Template from "../../components/Template/Template";
import UserCRUD from "./UserCRUD";

const SubscriptionHistory = () => {
  return (
    <>
      <Template>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/images/user.png"}
            className="d-none d-lg-inline"
            alt="logouser"
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
            All Users List
          </span>
        </div>
        <UserCRUD></UserCRUD>
      </Template>
    </>
  );
};

export default SubscriptionHistory;

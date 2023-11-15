import Template from "../../components/Template/Template";

import SubscriptionTable from "./SubscriptionTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
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
            Dashboard
          </span>

          <div className="row">
            <div className="col-md-12">
              <SubscriptionTable subscriptionStatus="Expiring" />
            </div>
            <div className="col-md-12" style={{ marginTop: 20}}>
              <SubscriptionTable subscriptionStatus="Expired" />
            </div>
          </div>
        </div>
      </Template>
    </>
  );
};

export default Dashboard;

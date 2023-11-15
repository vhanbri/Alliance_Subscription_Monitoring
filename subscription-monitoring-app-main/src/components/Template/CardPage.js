import React from "react";
import { Row, Card, Spinner } from "react-bootstrap";

const CardPage = ({
  users,
  usersIsLoading,
  subscriptions,
  subscriptionsIsLoading,
}) => {
  return (
    <Row>
      <div className="col-xl-6 col-md-6 mb-4">
        <div className="card border-left-dark shadow h-100 py-2">
          <Card.Body>
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                  Number of Users
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {usersIsLoading ? <Spinner /> : users.length}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-solid fa-users fa-2x text-gray-300"></i>
              </div>
            </div>
          </Card.Body>
        </div>
      </div>

      {/* <!-- Earnings (Monthly) Card Example --> */}
      <div className="col-xl-6 col-md-6 mb-4">
        <div className="card border-left-warning shadow h-100 py-2">
          <Card.Body>
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Number of Subscriptions
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {subscriptionsIsLoading ? <Spinner /> : subscriptions.length}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </Card.Body>
        </div>
      </div>
    </Row>
  );
};

export default CardPage;

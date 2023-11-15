import React, { useState, useEffect } from "react";
import Template from "../../components/Template/Template";
import CardPage from "../../components/Template/CardPage";
import UserService from "../../services/UserService";
import SubscriptionService from "../../services/SubscriptionService";
import LineChart from "./LineChart";
import { Col, Row } from "react-bootstrap";
import { MONTHS } from "../../constants";

const Analytics = () => {
  const [users, setUsers] = useState([]);
  const [usersIsLoading, setUsersIsLoading] = useState(true);

  const [userLabels, setUserLabels] = useState([]);
  const [userData, setUserData] = useState([]);

  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionsIsLoading, setSubscriptionsIsLoading] = useState(true);

  const [subscriptionLabels, setSubscriptionLabels] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);

  useEffect(() => {
    UserService.listAdmin({ pageSize: 10000000 }).then((resp) => {
      const users = resp.data.data;
      setUsers(users);

      // Get unique years from the data
      const uniqueYears = [
        ...new Set(users.map((obj) => new Date(obj.dateCreated).getFullYear())),
      ];
      // Generate labels for each year and month
      const labels = uniqueYears.flatMap((year) =>
        MONTHS.map((month) => `${month}${year}`)
      );

      const data = uniqueYears.flatMap((year) =>
        MONTHS.map(
          (month, index) =>
            users.filter(
              (s) =>
                new Date(s.dateCreated).getFullYear() === year &&
                new Date(s.dateCreated).getMonth() === index
            ).length
        )
      );

      setUsers(users);
      setUserLabels(labels);
      setUserData(data);

      setUsersIsLoading(false);
    });

    SubscriptionService.list({ page: 1, pageSize: 10000000 }).then((resp) => {
      const subscriptions = resp.data.data;

      // Get unique years from the data
      const uniqueYears = [
        ...new Set(
          subscriptions.map((obj) => new Date(obj.dateCreated).getFullYear())
        ),
      ];

      // Generate labels for each year and month
      const labels = uniqueYears.flatMap((year) =>
        MONTHS.map((month) => `${month}${year}`)
      );

      const data = uniqueYears.flatMap((year) =>
        MONTHS.map(
          (month, index) =>
            subscriptions.filter(
              (s) =>
                new Date(s.dateCreated).getFullYear() === year &&
                new Date(s.dateCreated).getMonth() === index
            ).length
        )
      );

      setSubscriptions(subscriptions);
      setSubscriptionLabels(labels);
      setSubscriptionData(data);

      setSubscriptionsIsLoading(false);
    });
  }, []);

  return (
    <>
      <Template>
        <CardPage
          users={users}
          usersIsLoading={usersIsLoading}
          subscriptions={subscriptions}
          subscriptionsIsLoading={subscriptionsIsLoading}
        />
        <Row style={{ marginTop: "5rem" }}>
          <Col xs={6}>
            <LineChart
              chartLabel="Users over Time"
              labels={userLabels}
              dataset={userData}
              borderColor="red"
            />
          </Col>
          <Col xs={6}>
            <LineChart
              chartLabel="Subscriptions over Time"
              labels={subscriptionLabels}
              dataset={subscriptionData}
              borderColor="rgb(246,194,62)"
            />
          </Col>
        </Row>
      </Template>
    </>
  );
};

export default Analytics;

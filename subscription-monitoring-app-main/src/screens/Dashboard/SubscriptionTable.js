import useSubscriptions from "../Subscriptions/hooks/useSubscriptions";
import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  dateFilter,
} from "react-bootstrap-table2-filter";

import SearchSubscriptionBar from "../../components/TableTemplate/SearchSubscriptionBar";
import "../../components/TableTemplate/styles.css";
import { formatDate } from "../../utils";
import "./Dashboard.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const SubscriptionTable = ({ subscriptionStatus }) => {
  const { fetchSubscriptionsWithStatus } = useSubscriptions();
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptions2, setSubscriptions2] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchSubscriptionsWithStatus({ status: subscriptionStatus }).then(
      (resp) => {
        setSubscriptions(resp);
        setSubscriptions2(resp);
      }
    );
  }, []);

  const genericOnFilter = (filterVal, data, column) => {
    if (filterVal) {
      const filteredData = data.filter((item) => {
        const value = item[column];

        if (
          typeof value === "string" &&
          value.toLowerCase().includes(filterVal.toLowerCase())
        ) {
          return true;
          // eslint-disable-next-line eqeqeq
        } else if (parseInt(value) == filterVal) {
          return true;
        }
        return false;
      });

      return filteredData;
    } else {
      return subscriptions;
    }
  };

  const genericDateOnFilter = (filter, data, column) => {
    if (filter && filter.date !== null) {
      if (filter.comparator === "") {
        filter.comparator = "=";
      }
      const filteredData = data.filter((obj) => {
        const objDate = new Date(obj[column]);
        const filterDate = new Date(filter.date);

        if (filter.comparator === "<") {
          return objDate < filterDate;
        } else if (filter.comparator === ">") {
          return objDate > filterDate;
        } else if (filter.comparator === "<=") {
          return objDate <= filterDate;
        } else if (filter.comparator === ">=") {
          return objDate >= filterDate;
        } else if (filter.comparator === "=") {
          return (
            objDate.getDay() === filterDate.getDay() &&
            objDate.getFullYear() === filterDate.getFullYear() &&
            objDate.getMonth() === filterDate.getMonth()
          );
        } else {
          return false;
        }
      });

      return filteredData;
    } else {
      return subscriptions;
    }
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters
        ? textFilter({
            onFilter: (filterVal, data) =>
              genericOnFilter(filterVal, data, "id"),
          })
        : false,
    },

    {
      dataField: "userName",
      text: "Owner",
      sort: true,

      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters
        ? textFilter({
            onFilter: (filterVal, data) =>
              genericOnFilter(filterVal, data, "userName"),
          })
        : false,
    },

    {
      dataField: "name",
      text: "Name",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters
        ? textFilter({
            onFilter: (filterVal, data) =>
              genericOnFilter(filterVal, data, "name"),
          })
        : false,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters
        ? textFilter({
            onFilter: (filterVal, data) =>
              genericOnFilter(filterVal, data, "description"),
          })
        : false,
    },

    {
      dataField: "dateCreated",
      text: "Datetime Created",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters
        ? dateFilter({
            onFilter: (filterVal, data) =>
              genericDateOnFilter(filterVal, data, "dateCreated"),
          })
        : false,
      formatter: (cell) => formatDate(cell),
    },
    {
      dataField: "dateExpiry",
      text: "Datetime Expiry",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters
        ? dateFilter({
            onFilter: (filterVal, data) =>
              genericDateOnFilter(filterVal, data, "dateCreated"),
          })
        : false,
      formatter: (cell) => formatDate(cell),
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-4">
      Showing {from} to {to} of {size} entries
    </span>
  );

  const paginationOptions = {
    // paginationSize: ,
    // pageStartIndex: searchParams.get("pageSize"),
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: false, // Hide the going to First and Last page button
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: subscriptions.length,
      },
    ],
  };

  return (
    <Card className="shadow" style={{ padding: 20 }}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span
          className="h5 text-gray-800"
          style={{
            display: "inline-flex",
            verticalAlign: "middle",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={subscriptionStatus === "Expiring" ? faCalendarAlt : faClock}
            className="mr-3"
          />
          {subscriptionStatus === "Expiring" ? "Expiring" : "Expired"}
        </span>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            className="btn btn-secondary "
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <SearchSubscriptionBar
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
            subscriptions2={subscriptions2}
          />
        </div>
        <BootstrapTable
          filterPosition={"top"}
          keyField="id"
          data={subscriptions}
          columns={columns}
          pagination={paginationFactory(paginationOptions)}
          filter={filterFactory()}
          noDataIndication="Table is Empty"
          headerClasses="custom-header"
          rowStyle={{ fontSize: "11px" }}
        />
      </Card.Body>
    </Card>
  );
};

export default SubscriptionTable;

import React, { useState, useEffect, useRef, useContext } from "react";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  dateFilter,
} from "react-bootstrap-table2-filter";

import ConfirmationDialog from "../../components/TableTemplate/ConfirmationDialog";

import "../../components/TableTemplate/styles.css";
import Export from "../../components/TableTemplate/Export";
import SearchUserBar from "../../components/TableTemplate/SearchUserBar";
import { formatDate } from "../../utils";
import SearchSubscriptionBar from "../../components/TableTemplate/SearchSubscriptionBar";
import { UserContext } from "../../providers/UserProvider";
import { ROLES } from "../../constants";

const SubscriptionTable = ({
  subscriptions,
  users,
  handleEditClick,
  handleDeleteButtonClick,
  handleCancelDelete,
  handleConfirmDelete,
  open,
  handleViewSubscriptionEditHistory,
}) => {
  const { user } = useContext(UserContext);
  const [showFilters, setShowFilters] = useState(false);
  const [currentSubscriptions, setCurrentSubscriptions] =
    useState(subscriptions);

  // This is for the search functionality where we need the current users not being 'searched'.
  const [currentSubscriptions2, setCurrentSubscriptions2] = useState(users);
  const tableRef = useRef(null);

  useEffect(() => {
    setCurrentSubscriptions(subscriptions);
    setCurrentSubscriptions2(subscriptions);
  }, []);

  const ownerFilter = (filterVal, data) => {
    if (filterVal) {
      const filteredData = data.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(filterVal.toLowerCase())
      );
      setCurrentSubscriptions(filteredData);
      setCurrentSubscriptions2(filteredData);
      return filteredData;
    } else {
      console.log("naa ko: ", currentSubscriptions2);

      setCurrentSubscriptions(users);
      setCurrentSubscriptions2(users);
      return users;
    }
  };

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

      setCurrentSubscriptions(filteredData);
      setCurrentSubscriptions2(filteredData);
      return filteredData;
    } else {
      setCurrentSubscriptions(subscriptions);
      setCurrentSubscriptions2(subscriptions);
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

  const computeColumns = () => {
    const c = [
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
        dataField: "status",
        text: "Status",
        sort: true,
        headerSortingClasses: (column, sortOrder) =>
          sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
        filter: showFilters
          ? textFilter({
              onFilter: (filterVal, data) =>
                genericOnFilter(filterVal, data, "status"),
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
                genericDateOnFilter(filterVal, data, "dateExpiry"),
            })
          : false,
        formatter: (cell) => formatDate(cell),
      },
      {
        dataField: "actions",
        text: "Actions",
        style: { minWidth: 100 },
        headerAlign: "center",
        formatter: (cell, row) => (
          <div
            className="text-center"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {user.role === ROLES.ADMIN && (
              <>
                <button
                  type="button"
                  className="btn btn-dark ml-2 mr-2 btn-circle btn-sm mb-2"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => handleEditClick(row)}
                >
                  <Edit fontSize="small" />
                </button>

                <button
                  type="button"
                  className="btn btn-danger ml-2 mr-2  btn-circle btn-sm mb-2"
                  onClick={() => {
                    handleDeleteButtonClick(row.id);
                  }}
                >
                  <Delete fontSize="small" />
                </button>
              </>
            )}

            <button
              type="button"
              className="btn btn-info ml-2 mr-2  btn-circle btn-sm mb-2"
              onClick={() => {
                handleViewSubscriptionEditHistory(row);
              }}
            >
              <Visibility fontSize="small" />
            </button>
          </div>
        ),
      },
    ];

    if (user.role === ROLES.ADMIN)
      c.splice(1, 0, {
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
      });

    return c;
  };

  const columns = computeColumns();

  return (
    <div className="pr-3 pl-3 pb-3 ">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-secondary "
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <SearchSubscriptionBar
          setSubscriptions={setCurrentSubscriptions}
          subscriptions2={currentSubscriptions2}
        />
      </div>
      <ConfirmationDialog
        open={open}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <BootstrapTable
        ref={tableRef}
        filterPosition={"top"}
        keyField="id"
        data={currentSubscriptions}
        columns={columns}
        pagination={paginationFactory(paginationOptions)}
        filter={filterFactory()}
        noDataIndication="Table is Empty"
      />
      <Export
        itemsToShow={currentSubscriptions}
        columns={columns}
        fileName="Subscriptions.xlsx"
      />
    </div>
  );
};
export default SubscriptionTable;

import React, { useState, useEffect, useRef } from "react";
import { Delete, Edit } from "@mui/icons-material";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import ConfirmationDialog from "../../components/TableTemplate/ConfirmationDialog";

import "../../components/TableTemplate/styles.css";
import Export from "../../components/TableTemplate/Export";
import SearchUserBar from "../../components/TableTemplate/SearchUserBar";

const UserTable = ({
  users,
  handleEditClick,
  handleDeleteButtonClick,
  handleCancelDelete,
  handleConfirmDelete,
  open,
  idToDelete,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentUsers, setCurrentUsers] = useState(users);

  // This is for the search functionality where we need the current users not being 'searched'.
  const [currentUsers2, setCurrentUsers2] = useState(users);
  const tableRef = useRef(null);

  useEffect(() => {
    setCurrentUsers(users);
    setCurrentUsers2(users);
  }, [users]);

  const nameFilter = (filterVal, data) => {
    console.log("FILTER VAL: ", filterVal, data);

    if (filterVal) {
      console.log("HERE filterval: ", filterVal);

      const filteredData = data.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(filterVal.toLowerCase())
      );
      setCurrentUsers(filteredData);
      setCurrentUsers2(filteredData);
      return filteredData;
    } else {
      console.log("naa ko: ", currentUsers2);

      setCurrentUsers(users);
      setCurrentUsers2(users);
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
        value: users.length,
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
        }
        return false;
      });

      setCurrentUsers(filteredData);
      setCurrentUsers2(filteredData);
      return filteredData;
    } else {
      setCurrentUsers(users);
      setCurrentUsers2(users);
      return users;
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
      dataField: "name",
      text: "Name",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters ? textFilter({ onFilter: nameFilter }) : false,
      formatter: (cell, row) => row.name,
    },

    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters
        ? textFilter({
            onFilter: (filterVal, data) =>
              genericOnFilter(filterVal, data, "email"),
          })
        : false,
    },
    {
      dataField: "role",
      text: "Role",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters
        ? textFilter({
            onFilter: (filterVal, data) =>
              genericOnFilter(filterVal, data, "role"),
          })
        : false,
    },
    {
      dataField: "actions",
      text: "Actions",
      style: { minWidth: 100 },
      headerAlign: "center",
      formatter: (cell, row) => (
        <div className="text-center">
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
            className="btn btn-danger btn-circle btn-sm mb-2"
            onClick={() => handleDeleteButtonClick(row.id)}
          >
            <Delete fontSize="small" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="pr-3 pl-3 pb-3 ">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-secondary "
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <SearchUserBar
          currentFilteredUsers={currentUsers2}
          users={currentUsers}
          setCurrentUsers={setCurrentUsers}
        />
      </div>
      <ConfirmationDialog
        open={open && idToDelete !== null}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <BootstrapTable
        ref={tableRef}
        filterPosition={"top"}
        keyField="id"
        data={currentUsers}
        columns={columns}
        pagination={paginationFactory(paginationOptions)}
        filter={filterFactory()}
        noDataIndication="Table is Empty"
      />
      <Export
        itemsToShow={currentUsers}
        columns={columns}
        fileName="Users.xlsx"
      />
    </div>
  );
};
export default UserTable;

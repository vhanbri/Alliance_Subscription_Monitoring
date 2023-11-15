import React, { useState, useEffect } from "react";

import { Delete, Edit } from "@mui/icons-material";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  dateFilter,
} from "react-bootstrap-table2-filter";

import ConfirmationDialog from "../../components/TableTemplate/ConfirmationDialog";
import SearchSubscriptionBar from "../../components/TableTemplate/Searchbar";
import "../../components/TableTemplate/styles.css";
import Export from "../../components/TableTemplate/Export";

const SubTable = ({
  subs,
  handleEditClick,
  handleDeleteButtonClick,
  handleCancelDelete,
  handleConfirmDelete,
  open,
  idToDelete,
  searchTerm,
  setSearchTerm,
  itemsToShow,
  isAdmin,
  user,
  allUsers,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const date = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const cellStyle = {
    height: "50px",
    width: "15rem",
  };

  const selectOptions = {
    0: "none",
    1: "ongoing",
    2: "expired",
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-4">
      Showing {from} to {to} of {size} entries
    </span>
  );

  const customFilter = (filterVal, data) => {
    if (filterVal) {
      return data.filter((item) =>
        `${item.user.FirstName} ${item.user.LastName}`
          .toLowerCase()
          .includes(filterVal.toLowerCase())
      );
    }
    return data;
  };

  const [filteredItems, setFilteredItems] = useState(itemsToShow); //displays filtered for User account, I put data={filteredItems} in BootstrapTable

  useEffect(() => {
    if (user.role === "User") {
      setFilteredItems(itemsToShow.filter((item) => item.user.Id === user.id));
    } else {
      setFilteredItems(itemsToShow);
    }
  }, [itemsToShow, user]);

  let columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters ? textFilter() : undefined,
    },
    // {
    //   dataField: "user.Id",
    //   text: "User ID",
    // },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters ? textFilter() : undefined,
    },
    {
      dataField: "user",
      text: "Owner",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters ? textFilter({ onFilter: customFilter }) : undefined,
      formatter: (cell, row) => `${cell.FirstName} ${cell.LastName}`,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters ? textFilter() : undefined,
    },
    {
      dataField: "dateCreated",
      text: "DT Created",
      style: cellStyle,
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      formatter: (cell) => new Date(cell).toLocaleString("en-US", date),
      filter: showFilters ? dateFilter() : undefined,
    },
    {
      dataField: "dateExpiry",
      text: "DT Expiry",
      style: cellStyle,
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      formatter: (cell) => new Date(cell).toLocaleString("en-US", date),
      filter: showFilters ? dateFilter() : undefined,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerSortingClasses: (column, sortOrder) =>
        sortOrder === "asc" ? "sorting-asc" : "sorting-desc",
      filter: showFilters ? textFilter() : undefined,
    },
  ];

  if (user.role === "User") {
    columns = columns.filter((column) => column.dataField !== "id");
  }

  if (isAdmin === user.role) {
    columns = columns.concat({
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
    });
  }

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
        value: subs.length,
      },
    ],
  };

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
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          itemsToShow={itemsToShow}
          subs={subs}
          date={date}
        />
      </div>
      <ConfirmationDialog
        open={open && idToDelete !== null}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <BootstrapTable
        filterPosition={"top"}
        keyField="id"
        data={filteredItems}
        columns={columns}
        pagination={paginationFactory(paginationOptions)}
        filter={filterFactory()}
        noDataIndication="Table is Empty"
      />
      {subs.length > 0 && (
        <Export itemsToShow={itemsToShow} columns={columns} disabled />
      )}
    </div>
  );
};

export default SubTable;

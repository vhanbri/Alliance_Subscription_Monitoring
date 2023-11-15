import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Table, Pagination } from "react-bootstrap";
import { PaginationTable } from "./PaginationTable";

import ConfirmationDialog from "./ConfirmationDialog";

const SubTable = ({
  itemsToShow,
  date,
  handleEditClick,
  handleDeleteButtonClick,
  idToDelete,
  handleCancelDelete,
  handleConfirmDelete,
  totalPages,
  handlePageChange,
  currentPage,
  open,
}) => {
  return (
    <>
      <Table
        className="table table-bordered mt-4 mb-4"
        id="dataTable"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">User Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Owner</th>
            <th scope="col">DT Created</th>
            <th scope="col">DT Expiry</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {itemsToShow.map((sub) => (
            <tr key={sub.id}>
              <th scope="row">{sub.id} </th>
              <td>{sub.user.Id}</td>
              <td>{sub.name}</td>
              <td>{sub.description}</td>
              <td>{sub.user.FirstName + " " + sub.user.LastName}</td>
              <td>{new Date(sub.dateCreated).toLocaleString("en-US", date)}</td>
              <td>{new Date(sub.dateExpiry).toLocaleString("en-US", date)}</td>
              <td>{sub.status}</td>

              <td className="text-center" style={{ width: "10rem" }}>
                <button
                  type="button"
                  className="btn btn-dark ml-2 mr-2 btn-circle btn-sm mb-2"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => handleEditClick(sub)}
                >
                  <Edit fontSize="small" />
                </button>

                <button
                  type="button"
                  className="btn btn-danger btn-circle btn-sm mb-2"
                  onClick={() => handleDeleteButtonClick(sub.id)}
                >
                  <Delete fontSize="small" />
                </button>
                <ConfirmationDialog
                  open={open && idToDelete !== null}
                  onClose={handleCancelDelete}
                  onConfirm={handleConfirmDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PaginationTable
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Pagination>
    </>
  );
};

export default SubTable;

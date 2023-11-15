import { useEffect, useState } from "react";

import UserCrudServices from "../../services/UserCrudServices";
import { toast } from "react-toastify";
import UserModal from "./UserModal";
import { Card, Button, Spinner } from "react-bootstrap";

import UserTable from "./UserTable";
import UserService from "../../services/UserService";
import Settings from "../Settings/Settings";
import useUsers from "./useUsers";

const UserCRUD = () => {
  const { users, fetchUsers, toast } = useUsers();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [origFirstName, setOrigFirstName] = useState("");
  const [origLastName, setOrigLastName] = useState("");
  const [origEmail, setOrigEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const userToUpdate = users.find((u) => u.id === id);
      const updatedUser = {
        id: userToUpdate.id,
        firstName: firstName || userToUpdate.firstName,
        lastName: lastName || userToUpdate.lastName,
        email: email || userToUpdate.email,
      };

      await UserCrudServices.update({ user: updatedUser });
      toast.success("User Updated!");
      setShowModal(false);
      clearFields();
      fetchUsers();
    } catch (error) {
      console.log("UserCRUD > handleUpdate > error: ", error);

      if (error.response.status === 400) {
        // For errors from viewmodel validations
        error.response.data.errors &&
          Object.values(error.response.data.errors).forEach((err) =>
            toast.error(err[0])
          );

        // For error from model states
        error.response.data?.ModelStateErrors.forEach((e) => {
          toast.error(e);
        });
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role,
      };
      await UserCrudServices.adduser(newUser);
      setShowModal(false);
      toast.success("User Added Successfully!");
      clearFields();
      fetchUsers();
    } catch (error) {
      if (error.response.status === 400) {
        // For errors from viewmodel validations
        error.response.data.errors &&
          Object.values(error.response.data.errors).forEach((err) =>
            toast.error(err[0])
          );

        // For error from model states
        error.response.data?.ModelStateErrors?.Errors.forEach((e) => {
          toast.error(e.ErrorMessage);
        });
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await UserCrudServices.delete({ id });
      toast.success("User Deleted!");
      fetchUsers();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  const editUser = (users) => {
    setId(users.id);
    setFirstName(users.firstName);
    setLastName(users.lastName);
    setEmail(users.email);
    setOrigEmail(users.email);
    setOrigFirstName(users.firstName);
    setOrigLastName(users.lastName);
  };

  const handleEditClick = (users) => {
    editUser(users);
    setIsEdit(() => true);
    setShowModal(true);
  };

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
  };

  const handleAddClick = () => {
    clearFields();
    setIsEdit(false);
    setShowModal(true);
  };

  const handleDeleteButtonClick = (id) => {
    setIdToDelete(id);
    setOpen(true);
  };

  const handleCancelDelete = () => {
    setIdToDelete(null);
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteUser(idToDelete);
    setOpen(false);
  };

  return (
    <>
      {users.length === 0 ? (
        <center>
          <Spinner />
        </center>
      ) : (
        <>
          {showModal && (
            <UserModal
              id={id}
              setId={setId}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              origFirstName={origFirstName}
              origLastName={origLastName}
              origEmail={origEmail}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              role={role}
              setRole={setRole}
              handleAdd={handleAddUser}
              handleUpdate={handleUpdate}
              isEdit={isEdit}
              handleAddClick={handleAddClick}
              showModal={showModal}
              setShowModal={setShowModal}
            ></UserModal>
          )}
          <Card className="shadow">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 pl-3 font-weight-bold text-danger mr-4">
                All Users
              </h6>
              <Button
                variant="primary"
                className="mt-2 mr-4"
                onClick={handleAddClick}
              >
                Add
              </Button>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <UserTable
                  users={users}
                  handleEditClick={handleEditClick}
                  handleDeleteButtonClick={handleDeleteButtonClick}
                  handleCancelDelete={handleCancelDelete}
                  handleConfirmDelete={handleConfirmDelete}
                  open={open}
                  idToDelete={idToDelete}
                ></UserTable>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default UserCRUD;

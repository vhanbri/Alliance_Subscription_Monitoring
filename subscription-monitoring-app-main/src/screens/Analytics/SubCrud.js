import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";

import SubModal from "./SubModal";
import SubTable from "./SubTable";
import SubscriptionService from "../../services/SubscriptionService";
import UserService from "../../services/UserService";

const SubCrud = () => {
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dateCreated, setDateCreated] = useState(null);
  const [dateExpiry, setDateExpiry] = useState(null);
  const [subs, setSubs] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState("Admin");
  const [open, setOpen] = useState(false);

  const [idToDelete, setIdToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { user, allUsers, setAllUsers } = useContext(UserContext);

  const date = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (date) => {
    return new Date(date).toISOString();
  };

  useEffect(() => {
    fetchData();
    if (isAdmin === user.role) {
      fetchAllUsers();
    }
    console.log(user.role);
    // fetchAllUsers(); // bug ni siya if imo gi logged in kay User na account, i comment lang para mu stop ang loop
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await SubscriptionService.list();
  //     setSubs(response.data?.data);
  //     // let maxId = Math.max(...response.data.data.map((record) => record.id));
  //     // setNewId(maxId + 1);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await SubscriptionService.list({
        page: 1,
        pageSize: 100000,
      });

      const subscription = response.data.data.map((subData) => {
        const { id, name, description, dateCreated, dateExpiry, status, user } =
          subData;

        return {
          id,
          name,
          description,
          dateCreated,
          dateExpiry,
          status,
          user,
        };
      });

      setSubs(subscription);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await UserService.list({});
      const userData = response?.data?.data;
      setAllUsers(userData);

      if (userData.length <= 1) {
        setUserId(userData[0]?.id);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const newSub = {
        UserId: userId,
        Name: name,
        Description: description,
        Status: "Ongoing",
        DateTimeCreated: formatDate(new Date()),
        DateTimeExpiry: dateExpiry.toLocaleString("en-US", date),
      };

      await SubscriptionService.add(newSub);

      setShowModal(false);
      toast.success("Subscription Added Successfully!");
      clearFields();
      fetchData();
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

  const handleDelete = async (id) => {
    try {
      await SubscriptionService.delete({ id: id });
      toast.success("Subscription Deleted!");
      clearFields();
      fetchData();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await SubscriptionService.update({
        id: subs.find((u) => u.id === id)?.id || id,
        UserId: userId,
        Name: name,
        Description: description,
        Status: status,
        DateTimeExpiry: dateExpiry.toLocaleString("en-US", date),
      });

      toast.success("Subscription Updated!");
      setShowModal(false);
      clearFields();
      fetchData();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(message);
    }
  };

  const editStudent = async (sub) => {
    setId(sub?.id);
    setUserId(user?.id);
    setName(sub.name);
    setDescription(sub.description);
    setStatus(sub.status);
    setDateExpiry(new Date(sub.dateExpiry));
  };

  const clearFields = async () => {
    setName("");
    setDescription("");
    setStatus("");
    setDateExpiry(null);
    setId("");
  };

  const handleEditClick = (sub) => {
    editStudent(sub);
    setShowModal(true);
    setIsEdit(true);
  };

  const handleAddClick = () => {
    clearFields();
    setShowModal(true);
    setIsEdit(false);
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
    handleDelete(idToDelete);
    setOpen(false);
  };

  const itemsToShow = subs.filter(
    (sub) =>
      searchTerm === "" ||
      sub?.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.user.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.user.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(sub?.dateCreated)
        ?.toLocaleString("en-US", date)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      new Date(sub?.dateExpiry)
        ?.toLocaleString("en-US", date)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SubModal
        id={id}
        setId={setId}
        userId={userId}
        setUserId={setUserId}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        dateExpiry={dateExpiry}
        setDateExpiry={setDateExpiry}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        isEdit={isEdit}
        allUsers={allUsers}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Card className="shadow">
        <Card.Header className="card-header d-flex justify-content-between align-items-center">
          <h6 className="m-0 pl-3 font-weight-bold text-danger mr-4">
            All Subscriptions
          </h6>
          {isAdmin === user.role ? (
            <button
              type="button"
              className="btn btn-primary mt-2 mr-4"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={handleAddClick}
            >
              Add
            </button>
          ) : (
            <></>
          )}
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <SubTable
              subs={subs}
              handleEditClick={handleEditClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleCancelDelete={handleCancelDelete}
              handleConfirmDelete={handleConfirmDelete}
              open={open}
              idToDelete={idToDelete}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              itemsToShow={itemsToShow}
              isAdmin={isAdmin}
              user={user}
              allUsers={allUsers}
            ></SubTable>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SubCrud;

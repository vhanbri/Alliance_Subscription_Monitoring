import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { toast } from "react-toastify";
import { Card, Button, Spinner } from "react-bootstrap";

import SubHistoryModal from "./SubHistoryModal";
import SubHistoryTable from "./SubHistoryTable";
import SubscriptionHistoryService from "../../services/SubcriptionHistoryService";

const SubHistory = () => {
  const [subs, setSubs] = useState([]);

  //edit history
  const [subsEdit, setSubsEdit] = useState([]);
  const [userId, setUserId] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [id, setId] = useState("");
  const [dateUpdated, setDateUpdated] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [userFullName, setUserFullName] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const [newId, setNewId] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { user, allUsers } = useContext(UserContext);

  const date = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    (() => fetchData())();
  }, []);

  const fetchData = async () => {
    try {
      const response = await SubscriptionHistoryService.list({
        page: 1,
        pageSize: 100000,
      });

      const subHistory = response.data.data.map((subData) => {
        const { id, remarks, dateUpdated, subscription } = subData;
        return {
          id,
          remarks,
          dateUpdated,
          subscription,
        };
      });

      setSubsEdit(response.data?.data);
      // setSubscriptionId(response.data.data[0].subscription.Id);

      setSubs(subHistory);
    } catch (error) {
      toast.error(error.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      await SubscriptionHistoryService.delete({ id: id });
      toast.success("Subscription History Deleted!");
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
      await SubscriptionHistoryService.update({
        id: subsEdit.find((u) => u.id === id).id || id,
        subscriptionId: subscriptionId,
        dateTimeUpdated: new Date(),
        remarks: remarks,
      });
      toast.success("Subscription History Updated!");
      setShowModal(false);
      clearFields();
      fetchData();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(message);
    }
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await API.put(
  //       "/SubscriptionHistoryAPI/Edit?id=" +
  //         subsEdit.find((u) => u.id === id).id || id,
  //       {
  //         id: id,
  //         // userId: userId,
  //         subscriptionId: subscriptionId,
  //         dateTimeUpdated: dateUpdated,
  //         remarks: remarks,
  //       }
  //     );
  //     alert("Subscription Updated!");
  //     clearFields();
  //     fetchData();
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  const editSub = async (sub) => {
    // setUserId(sub.user.Id);
    setSubscriptionId(sub.subscription.Id);
    setId(sub.id);
    setRemarks(sub.remarks);
    setDateUpdated(new Date(sub.dateUpdated));
  };

  const clearFields = async () => {
    setUserId("");
    setId("");
    setRemarks("");
    setDateUpdated("");
  };

  const handleEditClick = (sub) => {
    editSub(sub);
    setShowModal(true);
    setIsEdit(true);
  };

  const handleAddClick = () => {
    clearFields();
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

  const itemsToShow = subsEdit.filter(
    (sub) =>
      searchTerm === "" ||
      sub.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.subscription.Name?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      sub.subscription.Status?.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      sub.subscription.Description?.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      sub.remarks?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(sub.subscription.DateTimeCreated)
        ?.toLocaleString("en-US", date)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      new Date(sub.subscription.DateTimeExpiry)
        ?.toLocaleString("en-US", date)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      new Date(sub.dateUpdated)
        ?.toLocaleString("en-US", date)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  // .slice(startIndex, endIndex);
  return (
    <>
      {showModal && (
        <SubHistoryModal
          id={id}
          setId={setId}
          subscriptionId={subscriptionId}
          setSubscriptionId={setSubscriptionId}
          userId={userId}
          setUserId={setUserId}
          remarks={remarks}
          setRemarks={setRemarks}
          dateUpdated={dateUpdated}
          setDateUpdated={setDateUpdated}
          handleUpdate={handleUpdate}
          isEdit={isEdit}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <Card className="card shadow">
        <Card.Header className="card-header d-flex justify-content-between align-items-center">
          <h6 className="m-0 pl-3 font-weight-bold text-danger mr-4">
            All Subscriptions
          </h6>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <SubHistoryTable
              subs={subs}
              setSubs={setSubs}
              handleEditClick={handleEditClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleCancelDelete={handleCancelDelete}
              handleConfirmDelete={handleConfirmDelete}
              open={open}
              idToDelete={idToDelete}
              fetchData={fetchData}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              itemsToShow={itemsToShow}
              subsEdit={subsEdit}
              setSubsEdit={setSubsEdit}
              user={user}
              allUsers={allUsers}
            ></SubHistoryTable>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SubHistory;

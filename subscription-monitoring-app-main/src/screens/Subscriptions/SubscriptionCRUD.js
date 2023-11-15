import { useContext, useEffect, useState } from "react";

import UserCrudServices from "../../services/UserCrudServices";
import { toast } from "react-toastify";
import SubscriptionModal from "./SubscriptionModal";
import { Card, Button, Spinner } from "react-bootstrap";

import SubscriptionTable from "./SubscriptionTable";
import UserService from "../../services/UserService";
import useSubscriptions from "./hooks/useSubscriptions";
import useUsers from "../Users/useUsers";
import SubscriptionService from "../../services/SubscriptionService";
import useSubscriptionForm from "./hooks/useSubscriptionForm";
import SubscriptionEditHistoryModal from "./SubscriptionEditHistoryModal";
import SubscriptionHistoryService from "../../services/SubcriptionHistoryService";
import { formatDate } from "../../utils";
import { UserContext } from "../../providers/UserProvider";
import { ROLES } from "../../constants";

const SubscriptionCRUD = () => {
  const { user } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const {
    subscriptions,
    subscription,
    setSubscription,
    setSubscriptions,
    fetchSubscriptions,
    isFetching,
    subscriptionHistories,
    setSubscriptionHistories,
  } = useSubscriptions();

  const { handleDeleteSubscription, handleUpdateSubscription } =
    useSubscriptionForm({
      subscription,
      fetchSubscriptions,
      subscriptions,
      setSubscription,
    });

  const { users } = useUsers();

  const [isEdit, setIsEdit] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [showEditHistory, setShowEditHistory] = useState(false);

  const handleAddUser = async (e) => {};

  const handleEditClick = (s) => {
    setSubscription({ ...s, dateExpiry: formatDate(s.dateExpiry) });
    setShowModal(true);
    setIsEdit(true);
  };

  const clearFields = () => {
    setSubscription({});
  };

  const handleAddClick = () => {
    setSubscription({});
    clearFields();
    setIsEdit(false);
    setShowModal(true);
  };

  const handleDeleteButtonClick = (id) => {
    setSubscription({ ...subscription, id });
    setOpen(true);
  };

  const handleCancelDelete = () => {
    setSubscription({})
    setIdToDelete(null);
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteSubscription();
    setOpen(false);
  };

  const handleViewSubscriptionEditHistory = async (s) => {
    // Get subscription histories of subscription
    try {
      const subscriptionHistories = await SubscriptionHistoryService.list({
        page: 1,
        pageSize: 1000000,
        subscriptionId: s.id,
      });

      setSubscription(s);
      setSubscriptionHistories(subscriptionHistories.data.data);
      setShowEditHistory(true);
    } catch (e) {
      console.log("E: ", e);
      toast.error(
        "Something went wrong while fetching Subscription Edit Histories."
      );
    }
  };

  return (
    <>
      {isFetching ? (
        <center>
          <Spinner />
        </center>
      ) : (
        <>
          {showModal && (
            <SubscriptionModal
              subscriptions={subscriptions}
              setSubscriptions={setSubscriptions}
              subscription={subscription}
              setSubscription={setSubscription}
              users={users}
              fetchSubscriptions={fetchSubscriptions}
              clearFields={clearFields}
              showModal={showModal}
              setShowModal={setShowModal}
              id={id}
              setId={setId}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              role={role}
              setRole={setRole}
              handleAdd={handleAddUser}
              handleUpdate={handleUpdateSubscription}
              isEdit={isEdit}
              handleAddClick={handleAddClick}
            />
          )}

          {showEditHistory && (
            <SubscriptionEditHistoryModal
              subscriptionHistories={subscriptionHistories}
              subscription={subscription}
              showModal={showEditHistory}
              setShowModal={setShowEditHistory}
            />
          )}

          <Card className="shadow">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 pl-3 font-weight-bold text-danger mr-4">
                All Subscriptions
              </h6>
              {user.role === ROLES.ADMIN && (
                <Button
                  variant="primary"
                  className="mt-2 mr-4"
                  onClick={handleAddClick}
                >
                  Add
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <SubscriptionTable
                  subscriptions={subscriptions}
                  users={users}
                  handleEditClick={handleEditClick}
                  handleDeleteButtonClick={handleDeleteButtonClick}
                  handleCancelDelete={handleCancelDelete}
                  handleConfirmDelete={handleConfirmDelete}
                  open={open}
                  handleViewSubscriptionEditHistory={
                    handleViewSubscriptionEditHistory
                  }
                />
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default SubscriptionCRUD;

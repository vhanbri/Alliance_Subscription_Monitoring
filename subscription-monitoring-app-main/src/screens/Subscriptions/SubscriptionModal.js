import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DateTime from "react-datetime";
import useSubscriptionForm from "./hooks/useSubscriptionForm";
import { formatDate } from "../../utils";
import useSettings from "../Settings/useSettings";
import moment from "moment";

const SubscriptionModal = (props) => {
  const {
    subscription,
    setSubscription,
    showModal,
    setShowModal,
    isEdit,
    users,
  } = props;

  const { handleAddSubscription, handleUpdateSubscription, isValidDate } =
    useSubscriptionForm(props);

  const { fetchDefaultDaysExpiry } = useSettings();

  useEffect(() => {
    fetchDefaultDaysExpiry().then((data) => {
      if (Object.keys(subscription).length === 0 || subscription === null) {
        const defaultExpiryDate = moment().add(data, "days").toDate();
        setSubscription({ ...subscription, dateExpiry: defaultExpiryDate });
      }
    });
  }, [fetchDefaultDaysExpiry, setSubscription, subscription]);

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subscription Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="id">
              <Form.Control
                type="text"
                hidden
                value={subscription.id}
                onChange={(e) =>
                  setSubscription({ ...subscription, id: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="User" className="pb-3">
              <Form.Label>User</Form.Label>
              <Form.Select
                value={subscription?.userId}
                onChange={(e) => {
                  setSubscription({
                    ...subscription,
                    SubUserId: e.target.value,
                    UserId: e.target.value,
                    userId: e.target.value,
                  });
                }}
                required
              >
                <option value="">-- Select a user --</option>
                {users.map((user) => (
                  <option key={user} value={user.id}>
                    {user.firstName} {user.lastName} - {user.email} -{" "}
                    {user.role}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="Name" className="pb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={subscription.name}
                onChange={(e) =>
                  setSubscription({ ...subscription, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="Email" className="pb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="email"
                required
                value={subscription.description}
                onChange={(e) =>
                  setSubscription({
                    ...subscription,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="DatetimeExpiry" className="pb-3">
              <Form.Label>Datetime Expiry</Form.Label>
              <DateTime
                inputProps={{ required: true }}
                value={subscription.dateExpiry}
                onChange={(date) =>
                  setSubscription({
                    ...subscription,
                    dateExpiry: formatDate(date),
                  })
                }
                isValidDate={isValidDate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>

          {isEdit ? (
            <Button
              variant="warning"
              onClick={handleUpdateSubscription}
              // disabled=
            >
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddSubscription}>
              Add Subscription
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubscriptionModal;

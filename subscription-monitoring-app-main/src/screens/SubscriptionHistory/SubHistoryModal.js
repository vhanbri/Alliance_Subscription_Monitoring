import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Modal, Button, Form } from "react-bootstrap";

const SubHistoryModal = ({
  id,
  setId,
  subscriptionId,
  setSubscriptionId,
  userId,
  setUserId,
  remarks,
  setRemarks,
  dateUpdated,
  setDateUpdated,
  handleAdd,
  handleUpdate,
  isEdit,
  showModal,
  setShowModal,
}) => {
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subscription History Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="id">
              <Form.Control
                type="text"
                hidden
                value={id}
                onChange={(event) => setId(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="id">
              <Form.Control
                type="text"
                className="form-control"
                hidden
                value={subscriptionId}
                onChange={(event) => {
                  setSubscriptionId(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="remarks" className="pb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={remarks}
                onChange={(event) => {
                  setRemarks(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="dateUpdated" className="pb-3">
              <Form.Label>DT Updated</Form.Label>
              <br></br>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Date"
                  inputVariant="outlined"
                  id="dateUpdated"
                  value={new Date()}
                  readOnly={true}
                  fullWidth
                  onChange={(newValue) => setDateUpdated(newValue)}
                />
              </LocalizationProvider>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {isEdit ? (
            <Button variant="warning" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAdd}>
              Add User
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubHistoryModal;

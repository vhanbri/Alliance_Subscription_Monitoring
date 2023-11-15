import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Modal, Button, Form } from "react-bootstrap";

const SubModal = ({
  id,
  setId,
  userId,
  setUserId,
  name,
  setName,
  description,
  setDescription,
  dateExpiry,
  setDateExpiry,
  handleAdd,
  handleUpdate,
  isEdit,
  allUsers,
  showModal,
  setShowModal,
}) => {
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
                value={id}
                onChange={(event) => setId(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="userId" className="pb-3">
              {!isEdit && (
                <>
                  <label for="Users">Select User</label>

                  <select
                    className="form-control"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  >
                    <option value="">Select User</option>
                    {allUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </Form.Group>
            <Form.Group controlId="name" className="pb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="description" className="pb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="dateExpiry" className="pb-3">
              <Form.Label>DT Expiry</Form.Label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <br></br>
                <DateTimePicker
                  label="Date"
                  inputVariant="outlined"
                  value={dateExpiry}
                  fullWidth
                  onChange={(newValue) => setDateExpiry(newValue)}
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

export default SubModal;

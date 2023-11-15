import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UserModal = ({
  id,
  setId,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  role,
  setRole,
  handleAdd,
  handleUpdate,
  isEdit,
  showModal,
  setShowModal,
  origFirstName,
  origLastName,
  origEmail,
}) => {
  console.log("IS EDIT: ", isEdit);

  return (
    <>
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="id">
              <Form.Control
                type="text"
                hidden
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="firstName" className="pb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="lastName" className="pb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="pb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            {!isEdit && (
              <>
                <Form.Group controlId="password" className="pb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="pb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </Form.Group>
              </>
            )}

            {!isEdit && (
              <Form.Group controlId="role" className="pb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  required
                >
                  <option value="">-- Select Role --</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </Form.Control>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>

          {isEdit ? (
            <Button
              variant="warning"
              onClick={handleUpdate}
              disabled={
                origFirstName === firstName &&
                origLastName === lastName &&
                origEmail === email
              }
            >
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

export default UserModal;

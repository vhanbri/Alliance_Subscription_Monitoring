import React, { useContext, useEffect, useState } from "react";
import { Form, Card, Spinner, Button } from "react-bootstrap";
import { UserContext } from "../../providers/UserProvider";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";

const ProfileDetails = () => {
  const { user, login } = useContext(UserContext);

  const [editUser, setEditUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.edit({ ...editUser, email: editUser.emailId });

      login(editUser);
      toast.success("Successfully updated profile!");
    } catch (e) {
      console.log("ProfileDetails > handleSubmit: ", e);
      if (e?.response?.data?.ModelStateErrors.length !== 0) {
        e?.response?.data?.ModelStateErrors.forEach((err) => {
          toast.error(err);
        });
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  useEffect(() => {
    setEditUser(() => user);
  }, [user]);

  return editUser === null ? (
    <Spinner />
  ) : (
    <Card>
      <Card.Header>
        <span className="font-weight-bold text-danger">Profile</span>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="id">
            <Form.Control
              type="text"
              hidden
              value={editUser.id}
              onChange={(e) =>
                setEditUser((props) => ({ ...props, id: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group controlId="firstName" className="pb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={editUser.firstName}
              onChange={(e) =>
                setEditUser((props) => ({
                  ...props,
                  firstName: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="pb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={editUser.lastName}
              onChange={(e) =>
                setEditUser((props) => ({ ...props, lastName: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group controlId="email" className="pb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={editUser.emailId}
              onChange={(e) =>
                setEditUser((props) => ({ ...props, emailId: e.target.value }))
              }
            />
          </Form.Group>
          <Button
            variant="warning"
            type="submit"
            style={{ float: "right", width: "150px" }}
          >
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfileDetails;

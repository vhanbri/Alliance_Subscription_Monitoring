import { useContext, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { UserContext } from "../../providers/UserProvider";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";

const ChangePassword = () => {
  const { user } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await UserService.changePassword({
        id: user.id,
        oldPassword,
        newPassword,
        confirmNewPassword,
      });

      setNewPassword("");
      setOldPassword("");
      setConfirmNewPassword("");
      toast.success("Successfully changed password!");
    } catch (e) {
      console.log("ChangePassword > handleSubmit: ", e);
      console.log('e?.response.data?', e?.response.data.Errors)
      
      if (e?.response.data?.Succeeded === false) {
        e.response.data.Errors.forEach((err) => {
          toast.error(err.Description);
        });
      } else if(Object.keys(e?.response.data.errors).length !== 0){
        Object.keys(e?.response.data.errors).forEach(key => {
          toast.error(e?.response.data.errors[key][0])
        });
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  return (
    <Card>
      <Card.Header>
        <span className="font-weight-bold text-danger">Update Password</span>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="newPassword" className="pb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="newPassword" className="pb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmNewPassword" className="pb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
          </Form.Group>
          <Button
            variant="danger"
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

export default ChangePassword;

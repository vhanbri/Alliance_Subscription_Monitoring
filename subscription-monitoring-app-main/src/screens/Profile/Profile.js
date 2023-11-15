import Template from "../../components/Template/Template";
import { Row, Col } from "react-bootstrap";
import UpdateProfileDetails from "./UpdateProfileDetails";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  return (
    <Template>
      <Row>
        <Col md={6}>
          <UpdateProfileDetails />
        </Col>
        <Col md={6}>
          <ChangePassword />
        </Col>
      </Row>
    </Template>
  );
};

export default Profile;

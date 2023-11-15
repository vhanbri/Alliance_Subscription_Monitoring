import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { UserContext } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const { logout } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  console.log('user: ', user);
  
  const navigate = useNavigate();

  const handleProfileOnClick = () => {
    navigate("/profile", { replace: true });
  };

  return (
    <>
      <Nav.Item className="dropdown no-arrow">
        <Nav.Link
          className="dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">
            {user ? user.emailId : ""}
          </span>

          <img
            alt="logo"
            className="img-profile rounded-circle"
            src={process.env.PUBLIC_URL + "/images/profile.png"}
          />
        </Nav.Link>

        <div
          className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <a className="dropdown-item" onClick={handleProfileOnClick}>
            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Profile
          </a>

          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={(e) => handleLogout(e)}>
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </button>
        </div>
      </Nav.Item>
    </>
  );
};

export default UserInfo;

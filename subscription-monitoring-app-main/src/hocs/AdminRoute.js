import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { ROLES } from "../constants";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const authorized = user !== null && user.role === ROLES.ADMIN;

  React.useEffect(() => {
    if (!authorized) {
      navigate("/dashboard", { state: { from: location } });
    }
  }, [navigate, location, authorized]);

  return authorized ? children : null;
};

export default AdminRoute;

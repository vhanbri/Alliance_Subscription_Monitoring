import React, { useContext } from "react";
import { Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useContext(UserContext);

  const authenticated = userContext.user !== null;

  React.useEffect(() => {
    if (!authenticated) {
      navigate("/login", { state: { from: location } });
    }
  }, [authenticated, navigate, location, userContext]);

  return authenticated ? children : null;
};

export default PrivateRoute;

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    useEffect(() => {
      if (userContext.user) {
        navigate("/dashboard"); // Navigate to the login page
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Component {...props} />;
  };
}

export default withAuth;

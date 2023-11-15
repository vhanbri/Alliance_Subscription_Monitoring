import { useState, useEffect, useContext } from "react";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";
import { UserContext } from "../../providers/UserProvider";
import { ROLES } from "../../constants";

const useUsers = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      let response;

      if(user.role === ROLES.ADMIN) response = await UserService.listAdmin({ page: 1, pageSize: 1000000 });
      else response = await UserService.listUser({ page: 1, pageSize: 1000000 });

      const users = response.data.data.map((userData) => {
        const { id, firstName, lastName, email, role, remind } = userData;
        return {
          id,
          name: `${firstName} ${lastName}`,
          email,
          role,
          firstName,
          lastName,
          remind
        };
      });

      setUsers(users);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { users, setUsers, fetchUsers, toast };
};

export default useUsers;

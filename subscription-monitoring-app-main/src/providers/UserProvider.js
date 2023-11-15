import { useEffect } from "react";
import { createContext, useState } from "react";
import { getItemFromLocalStorage } from "../utils";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Retrieve the user from localStorage on mount
  useEffect(() => {
    const storedUser = getItemFromLocalStorage("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoaded(true);
  }, []);

  const login = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (!isLoaded) {
    return null; // Render nothing until the state has been fully loaded
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

// import { useEffect } from "react";
// import { createContext, useState } from "react";
// import { getItemFromLocalStorage } from "../utils";
// import UserService from "../services/UserService";
// import UserCrudServices from "../services/UserCrudServices";

// const UserContext = createContext();

// function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [allUsers, setAllUsers] = useState([]);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Retrieve the user from localStorage on mount
//   useEffect(() => {
//     const storedUser = getItemFromLocalStorage("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     fetchAllUsers(); // Fetch all users here
//     setIsLoaded(true);
//   }, []);

//   // Fetch all users data
//   const fetchAllUsers = async () => {
//     try {
//       const response = await UserCrudServices.list();
//       setAllUsers(response.data.data);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const login = (user) => {
//     setUser(user);
//     localStorage.setItem("user", JSON.stringify(user));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   if (!isLoaded) {
//     return null; // Render nothing until the state has been fully loaded
//   }

//   return (
//     <UserContext.Provider
//       value={{ user, allUsers, setAllUsers, fetchAllUsers, login, logout }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// export { UserContext, UserProvider };

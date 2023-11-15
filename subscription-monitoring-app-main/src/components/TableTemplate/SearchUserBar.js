import React, { useState } from "react";
import "./styles.css";
const SearchUserBar = ({ currentFilteredUsers, users, setCurrentUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterUsers = (u) =>
    u.filter(
      (user) =>
        user.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <input
      className="my-input border none pl-2 p-2 rounded"
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        // First set users to currentFilteredUsers before filtering
        setCurrentUsers(currentFilteredUsers);

        setCurrentUsers(
          e.target.value !== "" ? filterUsers(users) : currentFilteredUsers
        );
      }}
    />
  );
};

export default SearchUserBar;

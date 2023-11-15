import React, { useState } from "react";
import "./styles.css";
const SearchSubscriptionBar = ({ setSubscriptions, subscriptions2 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <input
      className="my-input border none pl-2 p-2 rounded"
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        const val = e.target.value;
          
        setSubscriptions(
          subscriptions2.filter((sub) => {
            return (
              val === "" ||
              sub.id?.toString().toLowerCase().includes(val.toLowerCase()) ||
              sub.name?.toLowerCase().includes(val.toLowerCase()) ||
              sub.user.firstName?.toLowerCase().includes(val.toLowerCase()) ||
              sub.user.lastName?.toLowerCase().includes(val.toLowerCase()) ||
              sub.description?.toLowerCase().includes(val.toLowerCase()) ||
              sub.status?.toLowerCase().includes(val.toLowerCase())
            );
          })
        );
      }}
    />
  );
};

export default SearchSubscriptionBar;

import React, { useContext, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { ROLES } from "../../constants";
const Navbar = () => {
  const { user } = useContext(UserContext);

  console.log("USER: ", user);

  const adminNavigations = () => {
    return (
      <>
        <NavLink to="/analytics">
          <CDBSidebarMenuItem icon="chart-line" iconSize="lg">
            Analytics
          </CDBSidebarMenuItem>
        </NavLink>
        <NavLink to="/users">
          <CDBSidebarMenuItem icon="user" iconSize="lg">
            Users
          </CDBSidebarMenuItem>
        </NavLink>

        <NavLink to="/settings">
          <CDBSidebarMenuItem icon="gear" iconSize="lg">
            Settings
          </CDBSidebarMenuItem>
        </NavLink>
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        overflow: "scroll initial",
      }}
    >
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#333"
        className="bg-gray-900"
        style={{ minHeight: "100vh" }}
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large pt-3"></i>}>
          <a
            // href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <img src={process.env.PUBLIC_URL + "/images/logo2.png"} />
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/dashboard">
              <CDBSidebarMenuItem icon="columns" iconSize="lg">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/subscriptions">
              <CDBSidebarMenuItem icon="dollar" iconSize="lg">
                Subscriptions
              </CDBSidebarMenuItem>
            </NavLink>
            {user.role === ROLES.ADMIN ? adminNavigations() : <></>}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Navbar;

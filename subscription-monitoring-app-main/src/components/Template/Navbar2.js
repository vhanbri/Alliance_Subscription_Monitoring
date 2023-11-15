import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceLaughWink,
  faBars,
  faUserTie,
  faGear,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";

// import { faFaceLaughWink } from "@fortawesome/free-regular-svg-icons";

const Navbar2 = () => {
  return (
    <div id="page-top">
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <ul
          className="navbar-nav bg-gray-900 sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* <!-- Sidebar - Brand --> */}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-text mx-3">
              <img src={process.env.PUBLIC_URL + "/images/logo2.png"} />
            </div>
          </a>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/* <!-- Nav Item - Dashboard --> */}
          <li className="nav-item">
            <a className="nav-link" href="index.html">
              <FontAwesomeIcon icon={faBars} className="mx-1" />
              <span>Dashboard</span>
            </a>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">MASTER LIST</div>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="/">
              <FontAwesomeIcon icon={faBitcoin} className="mx-1" />
              <span>Subscription Edit History</span>
            </a>
          </li>

          {/* <!-- Nav Item - Utilities Collapse Menu --> */}
          <li className="nav-item">
            <a className="nav-link " href="#">
              <FontAwesomeIcon icon={faUserTie} className="mx-1" />
              <span>All Users</span>
            </a>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">System Config</div>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item">
            <a className="nav-link" href="/">
              <FontAwesomeIcon icon={faGear} className="mx-1" />
              <span>Settings</span>
            </a>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider d-none d-md-block" />

          {/* <!-- Sidebar Toggler (Sidebar) --> */}
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle">
              {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
            </button>
          </div>
        </ul>
        {/* <!-- End of Sidebar --> */}
      </div>
    </div>
  );
};

export default Navbar2;

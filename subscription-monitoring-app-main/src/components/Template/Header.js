import React from "react";
import Notif from "./Notif";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button> */}

        <ul className="navbar-nav ml-auto">
          <Notif></Notif>

          <div className="topbar-divider d-none d-sm-block"></div>

          <UserInfo></UserInfo>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

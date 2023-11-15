import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import ScrollUpBtn from "./ScrollUpBtn";

const Template = ({ children }) => {
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header></Header>
            <div className="container-fluid">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
      <ScrollUpBtn />
    </div>
  );
};

export default Template;

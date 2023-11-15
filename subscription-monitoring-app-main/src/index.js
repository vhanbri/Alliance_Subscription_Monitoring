import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/sb-admin-2.css";
import "react-datetime/css/react-datetime.css";

// import "./scss/sb-admin-2.scss";
// import "./js/sb-admin-2.js";
// import "./js/demo/datatables-demo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

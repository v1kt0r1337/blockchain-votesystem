import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./frontend/components/appRoutes";
import { BrowserRouter as Router } from "react-router-dom";
//import registerServiceWorker from "./client/registerServiceWorker";
//import "./index.css";

const AppClient = () => (
    <Router >
        <AppRoutes />
    </Router>
);


ReactDOM.render(<AppClient />, document.getElementById("root"));
//registerServiceWorker();
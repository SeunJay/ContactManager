import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layouts/NavBar";
import CreateContact from "./components/contacts/CreateContact"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <NavBar branding="Contact Manager" />
      <div className="container">
        <CreateContact />
      </div>
    </Router>
  );
}

export default App;

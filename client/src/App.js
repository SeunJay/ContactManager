import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layouts/NavBar";
import Contacts from "./components/contacts/Contacts"
import CreateContact from "./components/contacts/CreateContact";
import Edit from "./components/contacts/Edit"
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <NavBar branding="Contact Manager" />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Contacts} />
          <Route exact path="/contact/create" component={CreateContact} />
          <Route exact path="/edit/:id" component={Edit} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;

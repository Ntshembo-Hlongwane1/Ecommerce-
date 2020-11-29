import React, { useEffect, useState } from "react";
import "./StyleSheet/App.css";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Header from "./Components/Header/Header";
import SignIn from "./Components/SignIn";
import axios from "axios";

const App = () => {
  const [auth_status, setAuthStatus] = useState(false);
  const [role_status, setRoleStatus] = useState(false);

  useEffect(() => {
    const url = "http://localhost:5000/api/check-isUserLoggedin";

    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        setAuthStatus(response.data.auth_status);
        setRoleStatus(response.data.role_status);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <Router className="App">
      <Switch>
        <Route path="/user-signup" exact={true}>
          <Header />
          <SignUp />
        </Route>
        <Route path="/user-signin" exact={true}>
          <Header />
          <SignIn />
        </Route>
        <Route path="/" exact={true}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

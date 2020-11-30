import React, { useEffect, useState } from "react";
import "./StyleSheet/App.css";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Header from "./Components/Header/Header";
import SignIn from "./Components/SignIn";
import { useDispatch } from "react-redux";
import AuthStatusCheck from "./store/Actions/auth_status_check/AuthStatusCheck";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthStatusCheck());
  }, []);

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

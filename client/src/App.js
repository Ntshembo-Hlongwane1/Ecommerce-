import React, { useEffect } from "react";
import "./StyleSheet/App.css";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Header from "./Components/Header/Header";
import SignIn from "./Components/SignIn";
import { useDispatch } from "react-redux";
import AuthStatusCheck from "./store/Actions/auth_status_check/AuthStatusCheck";
import DashBoard from "./Components/AdminDashBoard/DashBoard";
import AddNewProductsForm from "./Components/AdminDashBoard/AddNewProductsForm";
import Hoodies from "./Components/ProductsPages/Hoodies";
import Sneakers from "./Components/ProductsPages/Sneakers";
import Jeans from "./Components/ProductsPages/Jeans";
import WishList from "./Components/WishList";
import ProductDetails from "./Components/ProductDetails";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthStatusCheck());
  }, [dispatch]);

  return (
    <Router className="App">
      <Switch>
        <Route path="/products-hoodies">
          <Header />
          <Hoodies />
        </Route>
        <Route path="/product-details/:category/:id">
          <Header />
          <ProductDetails />
        </Route>
        <Route path="/wishlist">
          <Header />
          <WishList />
        </Route>
        <Route path="/products-sneakers">
          <Header />
          <Sneakers />
        </Route>
        <Route path="/products-jeans">
          <Header />
          <Jeans />
        </Route>
        <Route path="/admin-dashboard" exact={true}>
          <Header />
          <DashBoard />
        </Route>
        <Route path="/admin-dashboard/add-new-products" exact={true}>
          <Header />
          <AddNewProductsForm />
        </Route>
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

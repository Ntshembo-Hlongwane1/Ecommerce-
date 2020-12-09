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
import Cart from "./Components/Cart";
import PageNotFound from "./Components/PageNotFound";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthStatusCheck());
  }, [dispatch]);

  return (
    <Router className="App">
      <Switch>
        <Route path="/products-hoodies" exact={true}>
          <Header />
          <Hoodies />
        </Route>
        <Route path="/cart" exact={true}>
          <Header />
          <Cart />
        </Route>
        <Route path="/product-details/:category/:id" exact={true}>
          <Header />
          <ProductDetails />
        </Route>
        <Route path="/wishlist" exact={true}>
          <Header />
          <WishList />
        </Route>
        <Route path="/products-sneakers" exact={true}>
          <Header />
          <Sneakers />
        </Route>
        <Route path="/products-jeans" exact={true}>
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
        <Route path="">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListFetch from "../../store/Actions/ProductListFetch/ProductListFetch";
const Hoodies = () => {
  const productCategory = window.location.href.split("-")[1]; //First Letter lowercased
  const category =
    productCategory.charAt(0).toUpperCase() + productCategory.slice(1); // Uppercasing First Letter
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductListFetch(category));
  }, []);
  return (
    <div className="Products">
      <h1>Products</h1>
    </div>
  );
};

export default Hoodies;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListFetch from "../../store/Actions/ProductListFetch/ProductListFetch";
import ScreenLoader from "../../images/screenLoader.gif";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "../../StyleSheet/Products.css";

const Sneakers = () => {
  const productCategory = window.location.href.split("-")[1]; //First Letter lowercased
  const category =
    productCategory.charAt(0).toUpperCase() + productCategory.slice(1); // Uppercasing First Letter
  const dispatch = useDispatch();

  const { loading, productList, error } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(ProductListFetch(category));
  }, []);
  return (
    <div className="Products">
      {loading ? (
        <img src={ScreenLoader} alt={`Fetching All ${category}`} />
      ) : error ? (
        <h1>Network Error Please try again later :(</h1>
      ) : (
        productList && (
          <div className="Products__details">
            {productList.map((product) => {
              return (
                <div className="details" key={product._id}>
                  <div className="details__img">
                    <img src={product.picture} alt="" />
                    <FavoriteBorderIcon className="wishlist__icon" />
                  </div>
                  <div className="details__name">
                    <h4>{product.name}</h4>
                  </div>
                  <div className="details__price">
                    <h4>{`R${product.price}`}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

export default Sneakers;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListFetch from "../../store/Actions/ProductListFetch/ProductListFetch";
import ScreenLoader from "../../images/screenLoader.gif";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "../../StyleSheet/Products.css";
import axios from "axios";

const Jeans = () => {
  const productCategory = window.location.href.split("-")[1]; //First Letter lowercased
  const category =
    productCategory.charAt(0).toUpperCase() + productCategory.slice(1); // Uppercasing First Letter
  const dispatch = useDispatch();

  const { loading, productList, error } = useSelector(
    (state) => state.products
  );

  const AddWishLishItem = async (
    productID,
    productName,
    productPrice,
    imageURL
  ) => {
    const url = "http://localhost:5000/api/add-wishlist-item";

    const form_data = new FormData();
    form_data.append("imageURL", imageURL);
    form_data.append("productName", productName);
    form_data.append("productPrice", productPrice);
    form_data.append("productID", productID);

    try {
      const response = await axios.post(url, form_data, {
        withCredentials: true,
      });

      console.log(response);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    dispatch(ProductListFetch(category));
  }, []);
  return (
    <div className="Products">
      {loading ? (
        <img
          src={ScreenLoader}
          alt={`Fetching All ${category}`}
          className="Loading__screen"
        />
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
                    <FavoriteBorderIcon
                      className="wishlist__icon"
                      onClick={() =>
                        AddWishLishItem(
                          product._id,
                          product.name,
                          product.price,
                          product.picture
                        )
                      }
                    />
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

export default Jeans;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListFetch from "../../store/Actions/ProductListFetch/ProductListFetch";
import ScreenLoader from "../../images/screenLoader.gif";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "../../StyleSheet/Products.css";
import axios from "axios";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";

const Hoodies = () => {
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
    const pusher = new Pusher(process.env.REACT_APP_PusherKey, {
      cluster: process.env.REACT_APP_PusherCluster,
    });

    const channel = pusher.subscribe("wishlistInsertion");
    channel.bind("insert", (data) => {
      localStorage.setItem("notify", true);
      window.location.reload(false);
    });
    const channel2 = pusher.subscribe("wishlistUpdate");
    channel2.bind("update", (data) => {
      localStorage.setItem("notify", true);
      window.location.reload(false);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      channel2.unbind_all();
      channel2.unsubscribe();
    };
  }, []);

  useEffect(() => {
    dispatch(ProductListFetch(category));
  }, [dispatch, category]);
  return (
    <div className="Products">
      {loading ? (
        <img
          src={ScreenLoader}
          alt={`Fetching All ${category}`}
          className="Loading__screen"
        />
      ) : error ? (
        <h1 className="Error__message">
          Network Error Please try again later :(
        </h1>
      ) : (
        productList && (
          <div className="Products__details">
            {productList.map((product) => {
              return (
                <div className="details" key={product._id}>
                  <div className="details__img">
                    <Link
                      to={`/product-details/${category}/${product._id}`}
                      className="Router__link"
                    >
                      <img src={product.picture} alt="Product" />
                    </Link>
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

export default Hoodies;

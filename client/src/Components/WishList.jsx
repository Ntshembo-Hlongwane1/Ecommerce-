import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishListFetch from "../store/Actions/WishListFetch/WishListFetch";
import LoadingScreen from "../images/screenLoader.gif";
import "../StyleSheet/Products.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "axios";
import Pusher from "pusher-js";

const WishList = () => {
  const dispatch = useDispatch();
  const { loading, error, wishList } = useSelector(
    (state) => state.userWishList
  );

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PusherKey, {
      cluster: process.env.REACT_APP_PusherCluster,
    });

    const channel = pusher.subscribe("wishlistUpdate");
    channel.bind("update", (data) => {
      dispatch(WishListFetch());
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(WishListFetch());
  }, [dispatch]);

  const RemoveFromWishList = async (productID) => {
    const url = "http://localhost:5000/api/remove-wishlist-item";
    const production_url = "/api/remove-wishlist-item";
    const form_data = new FormData();
    form_data.append("productID", productID);

    try {
      const response = await axios.post(production_url, form_data, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="Wishlist">
      {loading ? (
        <img
          src={LoadingScreen}
          alt="Loading Screen"
          className="Loading__screen"
        />
      ) : error ? (
        <h2>WishList Empty</h2>
      ) : (
        wishList.wishlist && (
          <div className="Products__details">
            {wishList.wishlist.map((product) => {
              return (
                <div className="details" key={product.productID}>
                  <div className="details__img">
                    <img src={product.imageURL} alt="" />
                    <FavoriteBorderIcon
                      className="wishlist__icon active-icon"
                      onClick={() => RemoveFromWishList(product.productID)}
                    />
                  </div>
                  <div className="details__name">
                    <h4>{product.productName}</h4>
                  </div>
                  <div className="details__price">
                    <h4>{`R${product.productPrice}`}</h4>
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

export default WishList;

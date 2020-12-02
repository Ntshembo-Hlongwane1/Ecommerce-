import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishListFetch from "../store/Actions/WishListFetch/WishListFetch";
import LoadingScreen from "../images/screenLoader.gif";
import "../StyleSheet/Products.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const WishList = () => {
  const dispatch = useDispatch();
  const { loading, error, wishList } = useSelector(
    (state) => state.userWishList
  );
  console.log(wishList);
  useEffect(() => {
    dispatch(WishListFetch());
  }, []);

  const RemoveFromWishList = () => {};
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
                      onClick={() =>
                        RemoveFromWishList(
                          product._id,
                          product.name,
                          product.price,
                          product.picture
                        )
                      }
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

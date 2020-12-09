import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartFetch from "../store/Actions/CartFetch/CartFecth";
import LoadingScreen from "../images/cartScreenLoader.gif";
import "../StyleSheet/Cart.css";
import Axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const { loading, error, cartList } = useSelector((state) => state.userCart);
  let totalPrice = 0;
  useEffect(() => {
    dispatch(cartFetch());
  }, [dispatch]);

  const RemoveItemFromCart = async (productID) => {
    const baseURL = {
      dev: "http://localhost:5000/api/remove-from-cart",
      prod: "/api/remove-from-cart",
    };

    const url = baseURL.dev;

    const form_data = new FormData();
    form_data.append("productID", productID);

    try {
      const { data, status } = await Axios.post(url, form_data, {
        withCredentials: true,
      });

      if (status === 200) {
        window.location.reload(false);
      }
    } catch (error) {
      const { data, status } = error.response;
      console.error(data);
    }
  };
  return (
    <div className="Cart">
      <div className="cart">
        {loading ? (
          <img
            src={LoadingScreen}
            alt="Fetching cart..."
            className="Loading__screen cart-loader"
          />
        ) : error ? (
          <h1 className="error__messgae">{`${error.message} :(`}</h1>
        ) : cartList && cartList.length > 0 ? (
          cartList.map((item, idx) => {
            return (
              <div className="cartItems" key={item.productID}>
                <div className="cartItems__left">
                  <div className="cartItem__image">
                    <img src={item.productImage} alt="" />
                    <button
                      className="cart-btn"
                      onClick={() => RemoveItemFromCart(item.productID)}
                    >
                      Remove Item
                    </button>
                  </div>
                  <div className="cartItem__info">
                    <div className="info__name">
                      <h3>Name:</h3>
                      <h4>{item.productName}</h4>
                    </div>
                    <div className="info__price">
                      <h3> Price:</h3>
                      <h4>{`R${item.productPrice}`}</h4>
                    </div>
                    <div className="info__Qty">
                      <h3>Quantity:</h3>
                      <h4>{item.Qty}</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="Empty__cart">CART IS EMPTY</h1>
        )}
      </div>
      {cartList && cartList.length > 0 ? (
        <div className="cartItems__right">
          {cartList.map((item) => {
            totalPrice += item.productPrice * item.Qty;
          })}
          <h2>Cart Summary</h2>
          <h3>{`Total Price: R${totalPrice}`}</h3>
          <h4>
            {totalPrice > 1000
              ? `Shipping Free for items worth R1000+`
              : `Shipping Fee: R300`}
          </h4>
          <button className="checkout-btn">Proceed To Checkout</button>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;

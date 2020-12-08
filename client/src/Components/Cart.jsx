import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartFetch from "../store/Actions/CartFetch/CartFecth";
import LoadingScreen from "../images/cartScreenLoader.gif";
import "../StyleSheet/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { loading, error, cartList } = useSelector((state) => state.userCart);
  let totalPrice = 0;
  useEffect(() => {
    dispatch(cartFetch());
  }, [dispatch]);

  return (
    <div className="Cart">
      <div className="cart">
        {loading ? (
          <img
            src={LoadingScreen}
            alt="Fetching cart..."
            className="Loading__screen"
          />
        ) : error ? (
          <h1 className="error__messgae">{`${error.message} :(`}</h1>
        ) : (
          cartList &&
          cartList.map((item, idx) => {
            return (
              <div className="cartItems" key={item.productID}>
                <div className="cartItems__left">
                  <div className="cartItem__image">
                    <img src={item.productImage} alt="" />
                    <button className="cart-btn">Remove Item</button>
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
        )}
      </div>
      {cartList && (
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
      )}
    </div>
  );
};

export default Cart;

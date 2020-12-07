import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productDetailsFetch from "../store/Actions/ProductDetailsFetch/ProductDetailsFetch";
import LoadingScreen from "../images/screenLoader.gif";
import "../StyleSheet/productDetails.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const currentWindow = window.location.href;
  const productCategory = currentWindow.split("/")[4];
  const productID = currentWindow.split("/")[5];
  const [Qty, setQty] = useState(0);
  const { loading, error, productDetails } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    dispatch(productDetailsFetch(productCategory, productID));
  }, [dispatch, productCategory, productID]);
  return (
    <div>
      {loading ? (
        <img
          src={LoadingScreen}
          alt="Fetching Product Details..."
          className="Loading__screen"
        />
      ) : error ? (
        <h1>Network Error: Failed to fetch product details </h1>
      ) : (
        productDetails && (
          <div className="productDetails">
            <div className="details__info">
              <div className="info__left">
                <div className="left__top">
                  <img
                    src={productDetails.picture}
                    alt=""
                    className="productPicture"
                  />
                </div>
                <div className="left__bottom">
                  <h4 className="productName">{productDetails.description}</h4>
                </div>
              </div>
              <div className="info__right">
                <h3 className="product__infoSummary">Product Summary</h3>
                <h4 className="product__infoName">{productDetails.name}</h4>
                <h4 className="product__infoPrice">{`Total Price: R${productDetails.price}`}</h4>
                <label>Qty:</label>
                <select onChange={(e) => setQty(e.target.value)} value={Qty}>
                  <option>...</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
                <button className="add-cart-btn">ADD TO CART</button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetails;
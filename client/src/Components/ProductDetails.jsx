import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productDetailsFetch from "../store/Actions/ProductDetailsFetch/ProductDetailsFetch";
import LoadingScreen from "../images/screenLoader.gif";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const currentWindow = window.location.href;
  const productCategory = currentWindow.split("/")[4];
  const productID = currentWindow.split("/")[5];
  const { loading, error, productDetails } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    dispatch(productDetailsFetch(productCategory, productID));
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <img src={LoadingScreen} alt="Fetching Product Details..." />
      ) : error ? (
        <h1>Network Error: Failed to fetch product details </h1>
      ) : (
        productDetails && (
          <div className="productDetails">
            <div className="details__info">
              <div className="info__left">
                <div className="left__top">
                  <img src={productDetails.picture} alt="" />
                </div>
                <div className="left__bottom">
                  <h4>{productDetails.description}</h4>
                </div>
              </div>
              <div className="info__right">
                <h3>Product Summary</h3>
                <h4>{productDetails.name}</h4>
                <h4>{`Total Price: R${productDetails.price}`}</h4>
                <label>Qty:</label>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetails;

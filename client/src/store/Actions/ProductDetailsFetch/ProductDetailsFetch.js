import axios from "axios";
import {
  PRODUCT_DETAILS_FETCH_FAIL,
  PRODUCT_DETAILS_FETCH_REQUEST,
  PRODUCT_DETAILS_FETCH_SUCCESS,
} from "../../Actions/ProductDetailsFetch/actions";

const productDetailsFetch = (productCategory, productID) => async (
  dispatch
) => {
  const baseURL = {
    dev: `http://localhost:5000/api/fetch-product-details/${productCategory}/${productID}`,
    prod: `/api/fetch-product-details/${productCategory}/${productID}`,
  };
  const url =
    process.env.NODE_ENV === "production" ? baseURL.prod : baseURL.dev;

  try {
    dispatch({ type: PRODUCT_DETAILS_FETCH_REQUEST });
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    dispatch({ type: PRODUCT_DETAILS_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FETCH_FAIL, payload: error });
  }
};

export default productDetailsFetch;

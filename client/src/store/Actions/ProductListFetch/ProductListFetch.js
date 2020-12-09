import axios from "axios";
import {
  PRODUCT_FETCH_FAIL,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
} from "./actions";

const ProductListFetch = (productCategory) => async (dispatch) => {
  const baseURL = {
    dev: `http://localhost:5000/api/fetch-products/${productCategory}`,
    prod: `/api/fetch-products/${productCategory}`,
  };
  const url =
    process.env.NODE_ENV === "production" ? baseURL.prod : baseURL.dev;

  try {
    dispatch({ type: PRODUCT_FETCH_REQUEST });
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_FETCH_FAIL, payload: error });
  }
};

export default ProductListFetch;

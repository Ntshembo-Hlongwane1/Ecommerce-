import {
  CART_FETCH_FAIL,
  CART_FETCH_REQUEST,
  CART_FETCH_SUCCESS,
} from "./actions";
import axios from "axios";

const cartFetch = () => async (dispatch) => {
  const baseURL = {
    dev: "http://localhost:5000/api/get-cart",
    prod: "/api/get-cart",
  };
  const url = process.env.NODE_ENV === "producion" ? baseURL.prod : baseURL.dev;

  try {
    dispatch({ type: CART_FETCH_REQUEST });
    const { data } = await axios.get(url, {
      withCredentials: true,
    });

    dispatch({ type: CART_FETCH_SUCCESS, payload: data.cart });
  } catch (error) {
    dispatch({ type: CART_FETCH_FAIL, payload: error });
  }
};

export default cartFetch;

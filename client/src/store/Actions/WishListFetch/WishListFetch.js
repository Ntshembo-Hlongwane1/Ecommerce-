import axios from "axios";
import {
  WISH_LIST_FETCH_FAIL,
  WISH_LIST_FETCH_REQUEST,
  WISH_LIST_FETCH_SUCCESS,
} from "../WishListFetch/action";

const WishListFetch = () => async (dispatch) => {
  const baseURL = {
    dev: "http://localhost:5000/api/retrive-wishlist",
    prod: "/api/retrive-wishlist",
  };
  const url =
    process.env.NODE_ENV === "production" ? baseURL.prod : baseURL.dev;

  try {
    dispatch({ type: WISH_LIST_FETCH_REQUEST });
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    dispatch({ type: WISH_LIST_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WISH_LIST_FETCH_FAIL, payload: error });
  }
};

export default WishListFetch;

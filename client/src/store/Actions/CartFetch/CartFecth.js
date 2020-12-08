import {
  CART_FETCH_FAIL,
  CART_FETCH_REQUEST,
  CART_FETCH_SUCCESS,
} from "./actions";
import axios from "axios";

const cartFetch = () => async (dispatch) => {
  const url = "http://localhost:5000/api/get-cart";
  const production_url = "https://hlongwane-botique.herokuapp.com/api/get-cart";
  try {
    dispatch({ type: CART_FETCH_REQUEST });
    const { data } = await axios.get(production_url, { withCredentials: true });

    dispatch({ type: CART_FETCH_SUCCESS, payload: data.cart });
  } catch (error) {
    dispatch({ type: CART_FETCH_FAIL, payload: error });
  }
};

export default cartFetch;

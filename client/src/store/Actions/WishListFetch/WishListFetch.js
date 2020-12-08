import axios from "axios";
import {
  WISH_LIST_FETCH_FAIL,
  WISH_LIST_FETCH_REQUEST,
  WISH_LIST_FETCH_SUCCESS,
} from "../WishListFetch/action";

const WishListFetch = () => async (dispatch) => {
  const url = "http://localhost:5000/api/retrive-wishlist";
  const production_url = "http://localhost:5000/api/retrive-wishlist";

  try {
    dispatch({ type: WISH_LIST_FETCH_REQUEST });
    const { data } = await axios.get(production_url, { withCredentials: true });
    dispatch({ type: WISH_LIST_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WISH_LIST_FETCH_FAIL, payload: error });
  }
};

export default WishListFetch;

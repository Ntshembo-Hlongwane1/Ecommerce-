import {
  CART_FETCH_FAIL,
  CART_FETCH_REQUEST,
  CART_FETCH_SUCCESS,
} from "../../Actions/CartFetch/actions";

const CartFetchReducer = (state = { cartList: [] }, action) => {
  switch (action.type) {
    case CART_FETCH_REQUEST:
      return { loading: true };
    case CART_FETCH_SUCCESS:
      return { loading: false, cartList: action.payload };
    case CART_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default CartFetchReducer;

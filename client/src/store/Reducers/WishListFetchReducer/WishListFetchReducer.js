import {
  WISH_LIST_FETCH_FAIL,
  WISH_LIST_FETCH_REQUEST,
  WISH_LIST_FETCH_SUCCESS,
} from "../../Actions/WishListFetch/action";

const WishListFetchReducer = (state = { wishList: [] }, action) => {
  switch (action.type) {
    case WISH_LIST_FETCH_REQUEST:
      return { loading: true };
    case WISH_LIST_FETCH_SUCCESS:
      return { loading: false, wishList: action.payload };
    case WISH_LIST_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default WishListFetchReducer;

import {
  PRODUCT_DETAILS_FETCH_FAIL,
  PRODUCT_DETAILS_FETCH_REQUEST,
  PRODUCT_DETAILS_FETCH_SUCCESS,
} from "../../Actions/ProductDetailsFetch/actions";

const productDetailsFetchReducer = (state = { productDetails: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_FETCH_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_FETCH_SUCCESS:
      return { loading: false, productDetails: action.payload };
    case PRODUCT_DETAILS_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productDetailsFetchReducer;

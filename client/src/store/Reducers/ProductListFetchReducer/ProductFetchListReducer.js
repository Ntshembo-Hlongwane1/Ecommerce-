import {
  PRODUCT_FETCH_FAIL,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
} from "../../Actions/ProductListFetch/actions";

const ProductListFetchReducer = (state = { productList: [] }, action) => {
  switch (action.type) {
    case PRODUCT_FETCH_REQUEST:
      return { loading: true };
    case PRODUCT_FETCH_SUCCESS:
      return { loading: false, productList: action.payload };
    case PRODUCT_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ProductListFetchReducer;

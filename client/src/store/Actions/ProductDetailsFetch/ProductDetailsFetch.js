import axios from "axios";
import {
  PRODUCT_DETAILS_FETCH_FAIL,
  PRODUCT_DETAILS_FETCH_REQUEST,
  PRODUCT_DETAILS_FETCH_SUCCESS,
} from "../../Actions/ProductDetailsFetch/actions";

const productDetailsFetch = (productCategory, productID) => async (
  dispatch
) => {
  const url = `http://localhost:5000/api/fetch-product-details/${productCategory}/${productID}`;
  const production_url = `/api/fetch-product-details/${productCategory}/${productID}`;

  try {
    dispatch({ type: PRODUCT_DETAILS_FETCH_REQUEST });
    const { data } = await axios.get(production_url, { withCredentials: true });
    dispatch({ type: PRODUCT_DETAILS_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FETCH_FAIL, payload: error });
  }
};

export default productDetailsFetch;

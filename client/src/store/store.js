import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import AuthStatusCheckReducer from "./Reducers/AuthStatusCheckReducer/AuthStatusCheckReducer";
import productDetailsFetchReducer from "./Reducers/ProductDetailsFetchReducer/productDetailsFetchReducer";
import ProductListFetchReducer from "./Reducers/ProductListFetchReducer/ProductFetchListReducer";
import WishListFetchReducer from "./Reducers/WishListFetchReducer/WishListFetchReducer";

const initialState = {};

const reducers = combineReducers({
  userAuthStatus: AuthStatusCheckReducer,
  products: ProductListFetchReducer,
  userWishList: WishListFetchReducer,
  productDetail: productDetailsFetchReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import AuthStatusCheckReducer from "./Reducers/AuthStatusCheckReducer/AuthStatusCheckReducer";
import ProductListFetchReducer from "./Reducers/ProductListFetchReducer/ProductFetchListReducer";

const initialState = {};

const reducers = combineReducers({
  userAuthStatus: AuthStatusCheckReducer,
  products: ProductListFetchReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

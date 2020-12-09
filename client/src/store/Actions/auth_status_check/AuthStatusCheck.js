import axios from "axios";
import {
  AUTH_STATUS_FETCH_FAIL,
  AUTH_STATUS_FETCH_REQUEST,
  AUTH_STATUS_FETCH_SUCCESS,
} from "./actions";

const AuthStatusCheck = () => async (dispatch) => {
  const baseURL = {
    dev: "http://localhost:5000/api/check-isUserLoggedin",
    prod: "/api/check-isUserLoggedin",
  };
  const url =
    process.env.NODE_ENV === "production" ? baseURL.prod : baseURL.dev;
  try {
    dispatch({ type: AUTH_STATUS_FETCH_REQUEST });
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: AUTH_STATUS_FETCH_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: AUTH_STATUS_FETCH_FAIL });
  }
};

export default AuthStatusCheck;

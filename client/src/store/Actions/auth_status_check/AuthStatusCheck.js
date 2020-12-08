import axios from "axios";
import {
  AUTH_STATUS_FETCH_FAIL,
  AUTH_STATUS_FETCH_REQUEST,
  AUTH_STATUS_FETCH_SUCCESS,
} from "./actions";

const AuthStatusCheck = () => async (dispatch) => {
  const url = "http://localhost:5000/api/check-isUserLoggedin";
  const production_url =
    "https://hlongwane-botique.herokuapp.com/api/check-isUserLoggedin";
  try {
    dispatch({ type: AUTH_STATUS_FETCH_REQUEST });
    const { data } = await axios.get(production_url, { withCredentials: true });
    console.log(data);
    dispatch({ type: AUTH_STATUS_FETCH_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: AUTH_STATUS_FETCH_FAIL });
  }
};

export default AuthStatusCheck;

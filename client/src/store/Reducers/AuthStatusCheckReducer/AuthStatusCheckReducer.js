import {
  AUTH_STATUS_FETCH_FAIL,
  AUTH_STATUS_FETCH_REQUEST,
  AUTH_STATUS_FETCH_SUCCESS,
} from "../../Actions/auth_status_check/actions";

const AuthStatusCheckReducer = (state = { authStatus: [] }, action) => {
  switch (action.type) {
    case AUTH_STATUS_FETCH_REQUEST:
      return { loading: true };

    case AUTH_STATUS_FETCH_SUCCESS:
      return { loading: false, authStatus: action.payload };

    case AUTH_STATUS_FETCH_FAIL:
      return { loading: false, authStatus: action.payload };

    default:
      return state;
  }
};

export default AuthStatusCheckReducer;

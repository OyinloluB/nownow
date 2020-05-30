import AuthActionTypes from "./auth.types";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_UP_START:
    case AuthActionTypes.SIGN_IN_START:
      return {
        ...state,
        loading: true,
      };
    case AuthActionTypes.SIGN_UP_SUCCESS:
      return { ...state };
    case AuthActionTypes.SIGN_IN_SUCCESS:
      return { ...state };
    case AuthActionTypes.SIGN_UP_FAILURE:
    case AuthActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

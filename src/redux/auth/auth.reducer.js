import AuthActionTypes from "./auth.types";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {
    id: 1,
    userID: "ID",
    name: "Mr Blih",
    phone: "+2347056382932",
    delivery: true,
    longitude: Number.parseFloat("0"),
    latitude: Number.parseFloat("0"),
    payment: { cash: false, pos: true, transfer: true },
    product: [],
    type: "poc",
  },
  loading: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_UP_POC_START:
    case AuthActionTypes.SIGN_IN_POC_START:
    case AuthActionTypes.SIGN_UP_DISTRIBUTOR_START:
    case AuthActionTypes.SIGN_IN_DISTRIBUTOR_START:
    case AuthActionTypes.SIGN_UP_BULK_BREAKER_START:
    case AuthActionTypes.SIGN_IN_BULK_BREAKER_START:
      return {
        ...state,
        loading: true,
      };
    case AuthActionTypes.SIGN_UP_POC_SUCCESS:
    case AuthActionTypes.SIGN_UP_DISTRIBUTOR_SUCCESS:
    case AuthActionTypes.SIGN_UP_BULK_BREAKER_SUCCESS:
      return { ...state, loading: false, error: null };
    case AuthActionTypes.SIGN_IN_POC_SUCCESS:
    case AuthActionTypes.SIGN_IN_DISTRIBUTOR_SUCCESS:
    case AuthActionTypes.SIGN_IN_BULK_BREAKER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case AuthActionTypes.SIGN_UP_POC_FAILURE:
    case AuthActionTypes.SIGN_IN_POC_FAILURE:
    case AuthActionTypes.SIGN_UP_DISTRIBUTOR_FAILURE:
    case AuthActionTypes.SIGN_IN_DISTRIBUTOR_FAILURE:
    case AuthActionTypes.SIGN_UP_BULK_BREAKER_FAILURE:
    case AuthActionTypes.SIGN_IN_BULK_BREAKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

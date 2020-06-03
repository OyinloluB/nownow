import AuthActionTypes from "./auth.types";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  // user: {
  //   id: 1,
  //   userID: "ID",
  //   name: "Mr Blih",
  //   phone: "+2347056382932",
  //   delivery: true,
  //   longitude: Number.parseFloat("0"),
  //   latitude: Number.parseFloat("0"),
  //   payment: { cash: false, pos: true, transfer: true },
  //   product: [],
  //   type: "poc",
  // },
  loading: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATE_POC_START:
    case AuthActionTypes.AUTHENTICATE_DISTRIBUTOR_START:
    case AuthActionTypes.AUTHENTICATE_BULK_BREAKER_START:
      return {
        ...state,
        loading: true,
      };
    case AuthActionTypes.AUTHENTICATE_POC_SUCCESS:
    case AuthActionTypes.AUTHENTICATE_DISTRIBUTOR_SUCCESS:
    case AuthActionTypes.AUTHENTICATE_BULK_BREAKER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case AuthActionTypes.AUTHENTICATE_POC_FAILURE:
    case AuthActionTypes.AUTHENTICATE_DISTRIBUTOR_FAILURE:
    case AuthActionTypes.AUTHENTICATE_BULK_BREAKER_FAILURE:
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

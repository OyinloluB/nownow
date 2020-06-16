import AuthActionTypes from "./auth.types";

const INITIAL_STATE = {
  eligible: null,
  isAuthenticated: false,
  user: {},
  coordinates: { lat: 0, lng: 0},
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
    case AuthActionTypes.SET_ELIGIBILITY:
      return {
        ...state,
        eligible: action.payload,
      };
    case AuthActionTypes.SET_COORDINATES:
      return {
        ...state,
        coordinates: {...action.payload}
      };
      case AuthActionTypes.UPDATE_FIRST_TIMER_STATUS:
        return {
          ...state,
          user: {
            ...state.user,
            firstTimer: false,
          },
        };
      case AuthActionTypes.LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: {}
        };
    default:
      return state;
  }
};

export default authReducer;

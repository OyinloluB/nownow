import PasswordAction from "./password.types";

const INITIAL_STATE = {
  loading: false,
  error: null,
};

const passwordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PasswordAction.PASSWORD_DISTRIBUTOR_START:
    case PasswordAction.PASSWORD_BULKBREAKER_START:
    case PasswordAction.PASSWORD_POC_START:
      return {
        ...state,
        loading: true,
      };
    case PasswordAction.PASSWORD_DISTRIBUTOR_SUCCESS:
    case PasswordAction.PASSWORD_BULKBREAKER_SUCCESS:
    case PasswordAction.PASSWORD_POC_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case PasswordAction.PASSWORD_DISTRIBUTOR_FAILURE:
    case PasswordAction.PASSWORD_BULKBREAKER_FAILURE:
    case PasswordAction.PASSWORD_POC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default passwordReducer;

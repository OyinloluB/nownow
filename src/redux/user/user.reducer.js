import UserActionTypes from "./user.types";

const initialState = {
  loading: false,
  error: null,
  pocs: [],
  distributors: [],
  bulbbreakers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_POCS_START:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.FETCH_POCS_SUCCESS:
      return {
        ...state,
        loading: false,
        pocs: [...action.payload]
      };
    case UserActionTypes.FETCH_POCS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;

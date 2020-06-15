import UserActionTypes from "./user.types";

const initialState = {
  loading: false,
  error: null,
  pocs: [],
  distributors: [],
  bulkbreakers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_POCS_START:
    case UserActionTypes.FETCH_DISTRIBUTORS_START:
    case UserActionTypes.FETCH_BULK_BREAKERS_START:
    case UserActionTypes.UPDATE_POCS_START:
    case UserActionTypes.UPDATE_DISTRIBUTORS_START:
    case UserActionTypes.UPDATE_BULK_BREAKERS_START:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.FETCH_POCS_SUCCESS:
      return {
        ...state,
        loading: false,
        pocs: [...action.payload],
      };
    case UserActionTypes.FETCH_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        distributors: [...action.payload],
      };
    case UserActionTypes.FETCH_BULK_BREAKERS_SUCCESS:
      return {
        ...state,
        loading: false,
        bulkbreakers: [...action.payload],
      };
    case UserActionTypes.UPDATE_POCS_SUCCESS:
    case UserActionTypes.UPDATE_BULK_BREAKERS_SUCCESS:
    case UserActionTypes.UPDATE_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UserActionTypes.FETCH_POCS_FAILURE:
    case UserActionTypes.FETCH_DISTRIBUTORS_FAILURE:
    case UserActionTypes.FETCH_BULK_BREAKERS_FAILURE:
    case UserActionTypes.UPDATE_POCS_FAILURE:
    case UserActionTypes.UPDATE_DISTRIBUTORS_FAILURE:
    case UserActionTypes.UPDATE_BULK_BREAKERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

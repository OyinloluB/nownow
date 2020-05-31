import UserActionTypes from "./user.types";

const initialState = {
  loading: false,
  error: null,
  pocs: [
    {
      id: 1,
      userID: "blah blah",
      name: "Mr Blah",
      phone: "08058438284",
      delivery: true,
      longitude: Number.parseFloat("3.371155"),
      latitude: Number.parseFloat("6.537771"),
      payment: { cash: true, pos: false, transfer: true },
      product: [],
    },
    {
      id: 2,
      userID: "blah blah 2",
      name: "Mrs Bleh",
      phone: "07058438285",
      delivery: true,
      longitude: Number.parseFloat("3.362575"),
      latitude: Number.parseFloat("6.537347"),
      payment: { cash: true, pos: true, transfer: true },
      product: [],
    }
  ],
  distributors: [],
  bulkbreakers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_POCS_START:
    case UserActionTypes.FETCH_DISTRIBUTORS_START:
    case UserActionTypes.FETCH_BULK_BREAKERS_START:
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
    case UserActionTypes.FETCH_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        distributors: [...action.payload]
      };
    case UserActionTypes.FETCH_BULK_BREAKERS_SUCCESS:
      return {
        ...state,
        loading: false,
        bulkbreakers: [...action.payload]
      }
    case UserActionTypes.FETCH_POCS_FAILURE:
    case UserActionTypes.FETCH_DISTRIBUTORS_FAILURE:
    case UserActionTypes.FETCH_BULK_BREAKERS_FAILURE:
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

import MapActionTypes from "./map.types";

const initialState = {
  loading: false,
  error: null,
  pocs: [
    {
      id: 1,
      lat: 6.61469,
      lng: 3.358057,
    },
    {
      id: 2,
      lat: 6.616502,
      lng: 3.358003,
    },
  ],
  distributors: [
    {
      id: 3,
      lat: 6.614829,
      lng: 3.358207,
    },
    {
      id: 4,
      lat: 6.611094,
      lng: 3.353051,
    },
  ],
  bulbbreakers: [
    {
      id: 5,
      lat: 6.616807,
      lng: 3.355032,
    },
    {
      id: 6,
      lat: 6.616882,
      lng: 3.357028,
    },
  ],
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case MapActionTypes.FETCH_MARKERS_START:
      return {
        ...state,
        loading: true,
      };
    case MapActionTypes.FETCH_MARKERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case MapActionTypes.FETCH_MARKERS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default mapReducer;

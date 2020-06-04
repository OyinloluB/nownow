import UserActionTypes from "./user.types";
import axios from "../../axios-client";

import { trimUser } from "./user.helpers";

export const fetchPocsStart = () => ({
  type: UserActionTypes.FETCH_POCS_START,
});

export const fetchPocsSuccess = (users) => {
  const trimmedUsers = users.map((user) => ({
    ...trimUser(user),
    type: "poc",
    color: "red-dot",
  }));
  return {
    type: UserActionTypes.FETCH_POCS_SUCCESS,
    payload: trimmedUsers,
  };
};

export const fetchPocsFailure = (error) => ({
  type: UserActionTypes.FETCH_POCS_FAILURE,
  payload: error,
});

export const fetchPocs = () => {
  return async (dispatch) => {
    dispatch(fetchPocsStart());
    try {
      const response = await axios.get("/Poc");
      const { data } = response;
      dispatch(fetchPocsSuccess(data));
    } catch (error) {
      dispatch(fetchPocsFailure(error));
    }
  };
};

export const fetchDistributorsStart = () => ({
  type: UserActionTypes.FETCH_DISTRIBUTORS_START,
});

export const fetchDistributorsSuccess = (users) => {
  const trimmedUsers = users.map((user, i) => ({
    ...trimUser(user),
    type: "distributor",
    color: "green-dot",
    products:
      i < 4
        ? [
            {
              _id: `5ed60085bd17c98e3092891${i+8}`,
              brand: "Budweiser",
              sku: "CAN",
              volume: "330ml",
              image:
                "https://res.cloudinary.com/mckorr/image/upload/v1591083139/Bud_Can2_xg5hog.png",
              price: 200,
            },
            {
              _id: `5ed6022bbd17c98e3092891${i+9}`,
              brand: "Castle Lite",
              sku: "RGB",
              volume: "375ml",
              image:
                "https://res.cloudinary.com/mckorr/image/upload/v1590594136/Castle_Lite_ecsmyj.png",
              price: 100,
            },
          ]
        : [],
  }));
  return {
    type: UserActionTypes.FETCH_DISTRIBUTORS_SUCCESS,
    payload: trimmedUsers,
  };
};

export const fetchDistributorsFailure = (error) => ({
  type: UserActionTypes.FETCH_DISTRIBUTORS_FAILURE,
  payload: error,
});

export const fetchDistributors = () => {
  return async (dispatch) => {
    dispatch(fetchDistributorsStart());
    try {
      const response = await axios.get("/Distributor");
      const { data } = response;
      // console.log(data)
      dispatch(fetchDistributorsSuccess(data));
    } catch (error) {
      dispatch(fetchDistributorsFailure(error));
    }
  };
};

export const fetchBulkBreakersStart = () => ({
  type: UserActionTypes.FETCH_BULK_BREAKERS_START,
});

export const fetchBulkBreakersSuccess = (users) => {
  const trimmedUsers = users.map((user, i) => ({
    ...trimUser(user),
    type: "bulkbreaker",
    color: "blue-dot",
    products:
      i < 4
        ? [
            {
              _id: `5ed60085bd17c98e3092892${i+8}`,
              brand: "Budweiser",
              sku: "CAN",
              volume: "330ml",
              image:
                "https://res.cloudinary.com/mckorr/image/upload/v1591083139/Bud_Can2_xg5hog.png",
              price: 200,
            },
            {
              _id: `5ed6022bbd17c98e3092892${i+9}`,
              brand: "Castle Lite",
              sku: "RGB",
              volume: "375ml",
              image:
                "https://res.cloudinary.com/mckorr/image/upload/v1590594136/Castle_Lite_ecsmyj.png",
              price: 100,
            },
          ]
        : [],
  }));
  return {
    type: UserActionTypes.FETCH_BULK_BREAKERS_SUCCESS,
    payload: trimmedUsers,
  };
};

export const fetchBulkBreakersFailure = (error) => ({
  type: UserActionTypes.FETCH_BULK_BREAKERS_FAILURE,
  payload: error,
});

export const fetchBulkBreakers = () => {
  return async (dispatch) => {
    dispatch(fetchBulkBreakersStart());
    try {
      const response = await axios.get("/Bulkbreaker");
      const { data } = response;
      dispatch(fetchBulkBreakersSuccess(data));
    } catch (error) {
      dispatch(fetchBulkBreakersFailure(error));
    }
  };
};

export const fetchPocsAndDistributors = () => {
  return (dispatch) => {
    // dispatch(fetchPocs());
    dispatch(fetchDistributors());
  };
};

export const fetchBulkbreakersAndDistributors = () => {
  return (dispatch) => {
    dispatch(fetchBulkBreakers());
    dispatch(fetchDistributors());
  };
};

export const fetchPocsAndBulkbreakers = () => {
  return (dispatch) => {
    // dispatch(fetchPocs());
    dispatch(fetchBulkBreakers());
  };
};

const updatePocStart = () => ({
  type: UserActionTypes.UPDATE_POCS_START,
});

const updateDistributorStart = () => ({
  type: UserActionTypes.UPDATE_DISTRIBUTORS_START,
});

const updateBulkbreakerStart = () => ({
  type: UserActionTypes.UPDATE_BULK_BREAKERS_START,
});

const updatePocSuccess = () => ({
  type: UserActionTypes.UPDATE_POCS_SUCCESS,
});

const updateDistributorSuccess = () => ({
  type: UserActionTypes.UPDATE_DISTRIBUTORS_SUCCESS,
});

const updateBulkbreakerSuccess = () => ({
  type: UserActionTypes.UPDATE_BULK_BREAKERS_SUCCESS,
});

const updatePocFailure = (error) => ({
  type: UserActionTypes.UPDATE_POCS_FAILURE,
  payload: error,
});

const updateDistributorFailure = (error) => ({
  type: UserActionTypes.UPDATE_DISTRIBUTORS_FAILURE,
  payload: error,
});

const updateBulkbreakerFailure = (error) => ({
  type: UserActionTypes.UPDATE_BULK_BREAKERS_FAILURE,
  payload: error,
});

export const updatePoc = (ID, details) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(updatePocStart());
      try {
        const response = await axios.patch(`/Poc/${ID}`, details);
        const { data } = response;
        console.log(data);
        dispatch(updatePocSuccess());
        resolve();
      } catch (error) {
        dispatch(updatePocFailure(error));
        reject(error);
      }
    });
  };
};

export const updateDistributor = (ID, details) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(updateDistributorStart());
      try {
        const response = await axios.patch(`/Distributor/${ID}`, details);
        const { data } = response;
        console.log(data);
        dispatch(updateDistributorSuccess());
        resolve();
      } catch (error) {
        dispatch(updateDistributorFailure(error));
        reject(error);
      }
    });
  };
};

export const updateBulkbreaker = (ID, details) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(updateBulkbreakerStart());
      try {
        const response = await axios.patch(`/Bulkbreaker/${ID}`, details);
        const { data } = response;
        console.log(data);
        dispatch(updateBulkbreakerSuccess());
        resolve();
      } catch (error) {
        dispatch(updateBulkbreakerFailure(error));
        reject(error);
      }
    });
  };
};

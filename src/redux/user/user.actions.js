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
  const trimmedUsers = users.map((user) => ({
    ...trimUser(user),
    type: "distributor",
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
      const response = await axios.get("/Distributor/login");
      const { data } = response;
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
  const trimmedUsers = users.map((user) => ({
    ...trimUser(user),
    type: "bulkbreaker",
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
    dispatch(fetchPocs());
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
    dispatch(fetchPocs());
    dispatch(fetchBulkBreakers());
  };
};

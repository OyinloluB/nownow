import AuthActionTypes from "./auth.types";
import axios from "../../helpers/axios-client";

import { trimUser } from "../user/user.helpers";

// Sign In Start Actions
export const authenticatePocStart = () => ({
  type: AuthActionTypes.AUTHENTICATE_POC_START,
});

export const authenticateDistributorStart = () => ({
  type: AuthActionTypes.AUTHENTICATE_DISTRIBUTOR_START,
});

export const authenticateBulkBreakerStart = () => ({
  type: AuthActionTypes.AUTHENTICATE_BULK_BREAKER_START,
});

// Sign up Success actions
export const authenticatePocSuccess = (user) => ({
  type: AuthActionTypes.AUTHENTICATE_POC_SUCCESS,
  payload: { ...trimUser(user), type: "poc" },
});

export const authenticateDistributorSuccess = (user) => ({
  type: AuthActionTypes.AUTHENTICATE_DISTRIBUTOR_SUCCESS,
  payload: { ...trimUser(user), type: "distributor", },
});

export const authenticateBulkBreakerSuccess = (user) => ({
  type: AuthActionTypes.AUTHENTICATE_BULK_BREAKER_SUCCESS,
  payload: { ...trimUser(user), type: "bulkbreaker" },
});

// Sign up Failure actions
export const authenticatePocFailure = (error) => ({
  type: AuthActionTypes.AUTHENTICATE_POC_FAILURE,
  payload: error,
});

export const authenticateDistributorFailure = (error) => ({
  type: AuthActionTypes.AUTHENTICATE_DISTRIBUTOR_FAILURE,
  payload: error,
});

export const authenticateBulkBreakerFailure = (error) => ({
  type: AuthActionTypes.AUTHENTICATE_BULK_BREAKER_FAILURE,
  payload: error,
});

// Sign In Action Creators
export const authenticatePoc = (ID, password) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(authenticatePocStart());
      try {
        const response = await axios.post("/Poc/login", { ID, password });
        const { data } = response;
        if(data.success){
          dispatch(authenticatePocSuccess(data.poc));
        } else {
          throw data;
        }
        resolve(data.poc.product);
      } catch (error) {
        dispatch(authenticatePocFailure(error));
        reject(error);
      }
    });
  };
};

export const authenticateDistributor = (ID, password) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(authenticateDistributorStart());
      try {
        const response = await axios.post("/Distributor/login", { ID, password });
        const { data } = response;
        if(data.success){
          dispatch(authenticateDistributorSuccess(data.distributor));
        } else {
          throw data;
        }
        resolve(data.distributor.product);
      } catch (error) {
        dispatch(authenticateDistributorFailure(error));
        reject(error);
      }
    });
  };
};

export const authenticateBulkBreaker = (ID, password) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(authenticateBulkBreakerStart());
      try {
        const response = await axios.post("/Bulkbreaker/login", { ID, password });
        const { data } = response;
        if(data.success){
          dispatch(authenticateBulkBreakerSuccess(data.bulkBreaker));
        } else {
          throw data;
        }
        resolve(data.bulkBreaker.product);
      } catch (error) {
        dispatch(authenticateBulkBreakerFailure(error));
        reject(error);
      }
    });
  };
};

export const setEligibility = (status) => ({
  type: AuthActionTypes.SET_ELIGIBILITY,
  payload: status
});

export const setCoordinates = (coordinates) => ({
  type: AuthActionTypes.SET_COORDINATES,
  payload: coordinates
});


export const updateFirstTimerStatus = () => ({
  type: AuthActionTypes.UPDATE_FIRST_TIMER_STATUS
});

export const logout = () => ({
  type: AuthActionTypes.LOGOUT
});

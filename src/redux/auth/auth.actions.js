import AuthActionTypes from "./auth.types";
import axios from "../../axios-client";

import { trimUser } from "../user/user.helpers";

// Sign Up Start actions
export const signUpPocStart = () => ({
  type: AuthActionTypes.SIGN_UP_POC_START,
});

export const signUpDistributorStart = () => ({
  type: AuthActionTypes.SIGN_UP_DISTRIBUTOR_START,
});

export const signUpBulkBreakerStart = () => ({
  type: AuthActionTypes.SIGN_UP_BULK_BREAKER_START,
});

// Sign up Success actions
export const signUpPocSuccess = () => ({
  type: AuthActionTypes.SIGN_UP_POC_SUCCESS,
});

export const signUpDistributorSuccess = () => ({
  type: AuthActionTypes.SIGN_UP_DISTRIBUTOR_SUCCESS,
});

export const signUpBulkBreakerSuccess = () => ({
  type: AuthActionTypes.SIGN_UP_BULK_BREAKER_SUCCESS,
});

// Sign up Failure actions
export const signUpPocFailure = () => ({
  type: AuthActionTypes.SIGN_UP_POC_FAILURE,
});

export const signUpDistributorFailure = () => ({
  type: AuthActionTypes.SIGN_UP_DISTRIBUTOR_FAILURE,
});

export const signUpBulkBreakerFailure = () => ({
  type: AuthActionTypes.SIGN_UP_BULK_BREAKER_FAILURE,
});

// Sign Up Action Creators
export const signUpPoc = () => {
  return async (dispatch) => {
    dispatch(signUpPocStart());
    try {
      // TODO: Make Request for Sign up
      dispatch(signUpPocSuccess());
    } catch (error) {
      dispatch(signUpPocFailure(error));
    }
  };
};

export const signUpDistributor = () => {
  return async (dispatch) => {
    dispatch(signUpDistributorStart());
    try {
      // TODO: Make Request for Sign up
      dispatch(signUpDistributorSuccess());
    } catch (error) {
      dispatch(signUpDistributorFailure(error));
    }
  };
};

export const signUpBulkBreaker = () => {
  return async (dispatch) => {
    dispatch(signUpBulkBreakerStart());
    try {
      // TODO: Make Request for Sign up
      dispatch(signUpBulkBreakerSuccess());
    } catch (error) {
      dispatch(signUpBulkBreakerFailure(error));
    }
  };
};

// Sign In Start Actions
export const signInPocStart = () => ({
  type: AuthActionTypes.SIGN_IN_POC_START,
});

export const signInDistributorStart = () => ({
  type: AuthActionTypes.SIGN_IN_DISTRIBUTOR_START,
});

export const signInBulkBreakerStart = () => ({
  type: AuthActionTypes.SIGN_IN_BULK_BREAKER_START,
});

// Sign up Success actions
export const signInPocSuccess = (user) => ({
  type: AuthActionTypes.SIGN_IN_POC_SUCCESS,
  payload: { ...trimUser(user), type: "poc" },
});

export const signInDistributorSuccess = (user) => ({
  type: AuthActionTypes.SIGN_IN_DISTRIBUTOR_SUCCESS,
  payload: { ...trimUser(user), type: "distributor" },
});

export const signInBulkBreakerSuccess = (user) => ({
  type: AuthActionTypes.SIGN_IN_BULK_BREAKER_SUCCESS,
  payload: { ...trimUser(user), type: "bulkbreaker" },
});

// Sign up Failure actions
export const signInPocFailure = (error) => ({
  type: AuthActionTypes.SIGN_IN_POC_FAILURE,
  payload: error,
});

export const signInDistributorFailure = (error) => ({
  type: AuthActionTypes.SIGN_IN_DISTRIBUTOR_FAILURE,
  payload: error,
});

export const signInBulkBreakerFailure = (error) => ({
  type: AuthActionTypes.SIGN_IN_BULK_BREAKER_FAILURE,
  payload: error,
});

// Sign In Action Creators
export const signInPoc = () => {
  return async (dispatch) => {
    dispatch(signInPocStart());
    try {
      // TODO: Make Request for Sign In
      const data = {};
      dispatch(signInPocSuccess(data));
    } catch (error) {
      dispatch(signInPocFailure(error));
    }
  };
};

export const signInDistributor = () => {
  return async (dispatch) => {
    dispatch(signInDistributorStart());
    try {
      // TODO: Make Request for Sign In
      const data = {};
      dispatch(signInDistributorSuccess(data));
    } catch (error) {
      dispatch(signInDistributorFailure(error));
    }
  };
};

export const signInBulkBreaker = () => {
  return async (dispatch) => {
    dispatch(signInBulkBreakerStart());
    try {
      // TODO: Make Request for Sign In
      const data = {};
      dispatch(signInBulkBreakerSuccess(data));
    } catch (error) {
      dispatch(signInBulkBreakerFailure(error));
    }
  };
};

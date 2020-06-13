import PasswordAction from './password.types';
import axios from '../../helpers/axios-client';

export const updateDistributorPasswordStart = () => ({
    type: PasswordAction.PASSWORD_DISTRIBUTOR_START,
  });

export const updatePocPasswordStart = () => ({
    type: PasswordAction.PASSWORD_POC_START,
  });

export const updateBulkBreakerPasswordStart = () => ({
    type: PasswordAction.PASSWORD_BULK_BREAKER_START,
  });
  
  
  //Success actions
  export const updateDistributorPasswordSuccess = (user) => ({
    type: PasswordAction.PASSWORD_DISTRIBUTOR_SUCCESS,
    payload: user
  });

  export const updateBulkBreakerPasswordSuccess = (user) => ({
    type: PasswordAction.PASSWORD_BULK_BREAKER_SUCCESS,
    payload: user
  });

  export const updatePocPasswordSuccess = (user) => ({
    type: PasswordAction.PASSWORD_POC_SUCCESS,
    payload: user
  });

  // failure
  export const updateDistributorPasswordFailure = (error) => ({
    type: PasswordAction.PASSWORD_DISTRIBUTOR_FAILURE,
    payload: error,
  });

  export const updateBulkBreakerPasswordFailure = (error) => ({
    type: PasswordAction.PASSWORD_BULKBREAKER_FAILURE,
    payload: error,
  });
  export const updatePocPasswordFailure = (error) => ({
    type: PasswordAction.PASSWORD_POC_FAILURE,
    payload: error,
  });


  export const updateDistributorPassword = (ID, password) => {
    return (dispatch) => {
      return new Promise(async (resolve, reject) => {
        dispatch(updateDistributorPasswordStart());
        try {
          const response = await axios.patch("/Distributor/Password", { ID, password });
          const { data } = response;
          dispatch(updateDistributorPasswordSuccess());
          resolve(data.success);
          } catch(error){
          dispatch(updateDistributorPasswordFailure(error));
          reject(error);
      }
      });
    };
  };
  export const updateBulkBreakerPassword = (ID, password) => {
    return (dispatch) => {
      return new Promise(async (resolve, reject) => {
        dispatch(updateBulkBreakerPasswordStart());
        try {
          const response = await axios.patch("/BulkBreaker/Password", { ID, password });
          const { data } = response;
          dispatch(updateBulkBreakerPasswordSuccess());
          resolve(data.success);
          } catch(error){
          dispatch(updateBulkBreakerPasswordFailure(error));
          reject(error);
      }
      });
    };
  };

  export const updatePocPassword = (ID, password) => {
    return (dispatch) => {
      return new Promise(async (resolve, reject) => {
        dispatch(updatePocPasswordStart());
        try {
          const response = await axios.patch("/Poc/Password", { ID, password });
          const { data } = response;
          dispatch(updatePocPasswordSuccess());
          resolve(data.success);
          } catch(error){
          dispatch(updatePocPasswordFailure(error));
          reject(error);
      }
      });
    };
  };

  export const setEligibility = (status) => ({
    type: PasswordAction.SET_ELIGIBILITY,
    payload: status
  });
  

  
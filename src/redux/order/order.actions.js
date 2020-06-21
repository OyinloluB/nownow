import OrderActionTypes from "./order.types";
import axios from "../../helpers/axios-client";

const fetchReceivedOrdersStart = () => ({
  type: OrderActionTypes.FETCH_RECEIVED_ORDERS_START,
});

const fetchReceivedOrdersSuccess = (orders) => ({
  type: OrderActionTypes.FETCH_RECEIVED_ORDERS_SUCCESS,
  payload: orders.filter(Boolean),
});

const fetchReceivedOrdersFailure = (error) => ({
  type: OrderActionTypes.FETCH_RECEIVED_ORDERS_FAILURE,
  payload: error,
});

export const fetchReceivedOrders = () => {
  return async (dispatch, getState) => {
    dispatch(fetchReceivedOrdersStart());
    try {
      const { auth } = getState();
      const response = await axios.get(`/Order/${auth.user.userID}`);
      const { data } = response;
      if (data.success) {
        dispatch(fetchReceivedOrdersSuccess(data.orders));
      } else {
        dispatch(fetchReceivedOrdersFailure(data));
      }
    } catch (error) {
      dispatch(fetchReceivedOrdersFailure(error));
    }
  };
};

const fetchSentOrdersStart = () => ({
  type: OrderActionTypes.FETCH_SENT_ORDERS_START,
});

const fetchSentOrdersSuccess = (orders) => ({
  type: OrderActionTypes.FETCH_SENT_ORDERS_SUCCESS,
  payload: orders.filter(Boolean),
});

const fetchSentOrdersFailure = (error) => ({
  type: OrderActionTypes.FETCH_SENT_ORDERS_FAILURE,
  payload: error,
});

export const fetchSentOrders = () => {
  return async (dispatch, getState) => {
    dispatch(fetchSentOrdersStart());
    try {
      const { auth } = getState();
      const response = await axios.get(`/Order?ID=${auth.user.id}&userType=${auth.user.type}`);
      const { data } = response;
      if (data.success) {
        dispatch(fetchSentOrdersSuccess(data.orders));
      } else {
        dispatch(fetchSentOrdersFailure(data));
      }
    } catch (error) {
      dispatch(fetchSentOrdersFailure(error));
    }
  };
};

const updateOrderStart = () => ({
  type: OrderActionTypes.UPDATE_ORDER_START,
});

const updateOrderSuccess = () => ({
  type: OrderActionTypes.UPDATE_ORDER_SUCCESS,
});

const updateOrderFailure = (error) => ({
  type: OrderActionTypes.UPDATE_ORDER_FAILURE,
  payload: error,
});

export const updateOrder = (orderId, update) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(updateOrderStart());
      try {
        const response = await axios.patch(`/Order/${orderId}`, update);
        const { data } = response;
        if (data.success) {
          dispatch(updateOrderSuccess());
        } else {
          dispatch(updateOrderFailure(data));
        }
        resolve(data.success);
      } catch (error) {
        dispatch(updateOrderFailure(error));
        reject(error);
      }
    });
  };
};

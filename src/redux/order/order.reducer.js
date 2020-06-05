import OrderActionTypes from "./order.types";

const INITIAL_STATE = {
  loading: false,
  receivedOrders: [],
  sentOrders: [],
  error: null,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.FETCH_RECEIVED_ORDERS_START:
    case OrderActionTypes.FETCH_SENT_ORDERS_START:
    case OrderActionTypes.UPDATE_ORDER_STATUS_START:
      return {
        ...state,
        loading: true,
      };
    case OrderActionTypes.FETCH_RECEIVED_ORDERS_SUCCESS:
      return {
        ...state,
        receivedOrders: [...action.payload],
        loading: false,
        error: null,
      };
      case OrderActionTypes.FETCH_SENT_ORDERS_SUCCESS:
        return {
          ...state,
          sentOrders: [...action.payload],
          loading: false,
          error: null,
        };
    case OrderActionTypes.UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case OrderActionTypes.FETCH_RECEIVED_ORDERS_FAILURE:
    case OrderActionTypes.FETCH_SENT_ORDERS_FAILURE:
    case OrderActionTypes.UPDATE_ORDER_STATUS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderReducer;

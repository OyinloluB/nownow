import CartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return {
        ...state,
        items: addItemToCart(state.items, action.payload),
      };
    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: removeItemFromCart(state.items, action.payload),
      };
    case CartActionTypes.CLEAR_FROM_CART:
      return {
        ...state,
        items: state.items.filter(
          (item) => {
            return !(
              item._id === action.payload._id &&
              item.userID === action.payload.userID
            )
          }
            
        ),
      };
    case CartActionTypes.MAKE_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case CartActionTypes.MAKE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [],
        error: null,
      };
    case CartActionTypes.MAKE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;

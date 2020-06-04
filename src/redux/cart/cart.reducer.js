import CartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
  items: [],
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
          (item) =>
            item._id !== action.payload._id && item.userID !== action.payload.userID
        ),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer;

import CartActionTypes from "./cart.types";
import axios from "../../helpers/axios-client";

export const addToCart = (item) => ({
  type: CartActionTypes.ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (item) => ({
  type: CartActionTypes.REMOVE_FROM_CART,
  payload: item,
});

export const clearFromCart = (item) => ({
  type: CartActionTypes.CLEAR_FROM_CART,
  payload: item,
});

export const setCartItems = (items) => ({
  type: CartActionTypes.SET_ITEMS,
  payload: items,
});

const makeOrderStart = () => ({
  type: CartActionTypes.MAKE_ORDER_START,
});

const makeOrderSuccess = () => ({
  type: CartActionTypes.MAKE_ORDER_SUCCESS,
});

const makeOrderFailure = (error) => ({
  type: CartActionTypes.MAKE_ORDER_FAILURE,
  payload: error,
});

export const makeOrder = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      dispatch(makeOrderStart());
      try {
        const { auth, cart } = getState();
        const response = await axios.post("/Order", {
          userType: auth.user.type,
          products: [...cart.items],
          total: cart.items.reduce((currentTotal, item) => {
            return currentTotal + item.price * item.quantity;
          }, 0),
          requesterID: auth.user.id,
        });
        const { data } = response;

        dispatch(makeOrderSuccess());
        resolve(data.success);
      } catch (error) {
        dispatch(makeOrderFailure(error));
        reject(error);
      }
    });
  };
};

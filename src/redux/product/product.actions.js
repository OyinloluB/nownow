import ProductActionTypes from "./product.types";
import axios from "../../helpers/axios-client";

const fetchProductsStart = () => {
  return {
    type: ProductActionTypes.FETCH_PRODUCTS_START,
  };
};

const fetchProductsSuccess = (products) => {
  return {
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

const fetchProductsFailure = (error) => {
  return {
    type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const response = await axios.get("/Product");
      const { data } = response;
      dispatch(fetchProductsSuccess(data));
    } catch (error) {
      dispatch(fetchProductsFailure(error));
    }
  };
};

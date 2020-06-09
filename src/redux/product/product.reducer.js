import ProductActionTypes from "./product.types";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: [...action.payload],
        loading: false,
        error: null,
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;

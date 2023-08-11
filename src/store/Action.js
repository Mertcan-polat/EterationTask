import {
  SET_API_DATA,
  SET_FILTERED_API_DATA,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "./actionTypes";

export const setApiData = (data) => {
  return {
    type: SET_API_DATA,
    payload: data,
  };
};

export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ADD_TO_CART,
        payload: product,
      });
    } catch (error) {
      console.error("Hata:", error);
      dispatch({
        type: "ADD_TO_CART_ERROR",
        payload: error,
      });
    }
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const setFilteredApiData = (filteredData) => {
  return {
    type: SET_FILTERED_API_DATA,
    payload: filteredData,
  };
};

export const SET_FILTER = "SET_FILTER";

export const setFilter = (filterValue) => {
  return {
    type: SET_FILTER,
    payload: filterValue,
  };
};

export const setSearchTerm = (searchTerm) => ({
  type: "SET_SEARCH_TERM",
  payload: searchTerm,
});

export const updateCart = (productId, quantity) => {
  return {
    type: UPDATE_CART,
    payload: { productId, quantity },
  };
};

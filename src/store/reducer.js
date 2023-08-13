import {
  SET_API_DATA,
  SET_FILTERED_API_DATA,
  SET_FILTER_TERM,
  SET_FILTER,
} from "./actionTypes";
const initialState = {
  cartItems: [],
  apiData: [],
  filteredApiData: [],
  filter: "",
  searchTerm: "",
  filterValue: "",
  totalPrice: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_API_DATA:
      return {
        ...state,
        apiData: action.payload,
        filteredApiData: action.payload,
      };
    case "UPDATE_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
        totalPrice: action.payload.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };
    case SET_FILTER_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case SET_FILTER:
      return {
        ...state,
        filterValue: action.payload,
      };
    case SET_FILTERED_API_DATA:
      return {
        ...state,
        filteredApiData: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

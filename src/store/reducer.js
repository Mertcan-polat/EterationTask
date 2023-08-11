import {
  SET_API_DATA,
  SET_FILTERED_API_DATA,
  SET_FILTER_TERM,
} from "./actionTypes";
const initialState = {
  apiData: [],
  filteredApiData: [], // Filtrelenmiş veri listesi
  filter: "", // Filtre değeri
  searchTerm: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_API_DATA:
      return {
        ...state,
        apiData: action.payload,
        filteredApiData: action.payload,
      };
    case SET_FILTER_TERM:
      return {
        ...state,
        searchTerm: action.payload,
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

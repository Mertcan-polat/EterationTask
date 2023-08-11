import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import cartReducer from "./cardReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  data: reducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;

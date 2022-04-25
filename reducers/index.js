import { combineReducers } from "redux";
import shipReducer from "./ship";

export default combineReducers({
  ship: shipReducer,
});

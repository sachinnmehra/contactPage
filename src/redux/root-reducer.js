import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import contactReducer from "./Contact/contact.reducer";
export default combineReducers({
  user: userReducer,
  contact: contactReducer,
});

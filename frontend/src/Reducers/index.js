import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ReviewReducer from "./ReviewReducer";
import WardReducer from "./WardReducer";
import ChangeWardReducer from "./ChangeWardReducers";
export default combineReducers({
  auth: AuthReducer,
  wards: WardReducer,
  reviews: ReviewReducer,
  wardName: ChangeWardReducer,
});

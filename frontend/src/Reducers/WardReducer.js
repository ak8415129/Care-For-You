import {
  EDIT_WARD_DATA,
  FETCH_WARD_DATA,
  POST_WARD_DATA,
} from "../Types/ActionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (wards = [], action) => {
  switch (action.type) {
    case FETCH_WARD_DATA:
      return action.payload;
    case POST_WARD_DATA:
      return [...wards, action.payload];
    case EDIT_WARD_DATA:
      return wards.map((ward) =>
        ward._id === action.payload._id ? action.payload : ward
      );
    default:
      return wards;
  }
};

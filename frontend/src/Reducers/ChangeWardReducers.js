import { CHANGE_WARD } from "../Types/ActionTypes";

export default (ward = "Covid Ward", action) => {
  switch (action.type) {
    case CHANGE_WARD:
      return (ward = action.payload);
    default:
      return ward;
  }
};

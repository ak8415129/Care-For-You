import { CHANGE_WARD } from "../Types/ActionTypes";

export const changeWard = (clickedWardName) => {
  return {
    type: CHANGE_WARD,
    payload: clickedWardName,
  };
};

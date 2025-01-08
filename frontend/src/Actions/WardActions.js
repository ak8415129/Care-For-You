import * as api from "../Api/Api";
import {
  EDIT_WARD_DATA,
  FETCH_WARD_DATA,
  POST_WARD_DATA,
} from "../Types/ActionTypes";

//fetch ward data
export const getWardData = () => async (dispatch) => {
  try {
    const { data } = await api.fetchWardData();
    dispatch({ type: FETCH_WARD_DATA, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//post ward data
export const putWardData = (ward) => async (dispatch) => {
  try {
    const { data } = await api.postWardData(ward);
    dispatch({ type: POST_WARD_DATA, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//edit ward data
export const updateWardData = (id, updatedData) => async (dispatch) => {
  try {
    const { data } = await api.editWardData(id, updatedData);
    dispatch({ type: EDIT_WARD_DATA, payload: data });
  } catch (error) {
    console.log(error);
  }
};

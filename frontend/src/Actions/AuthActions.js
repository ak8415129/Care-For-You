import * as api from "../Api/Api";
import { LOGOUT } from "../Types/ActionTypes";

//register actions creator
export const register = (authData, navigate) => async (dispatch) => {
  try {
    console.log(authData);
    const { data } = await api.registerUser(authData);
    dispatch({ type: "AUTH", payload: data });
    navigate("/");
  } catch (e) {
    console.log(e);
  }
};

//login actions creator
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(authData);
    console.log(data);
    dispatch({ type: "AUTH", payload: data });
    navigate("/");
  } catch (e) {
    console.log(e);
  }
};

// logout action creator
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

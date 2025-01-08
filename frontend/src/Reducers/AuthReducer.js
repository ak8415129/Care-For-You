import { AUTH, LOGOUT } from "../Types/ActionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (auth = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...auth, authData: action.payload };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...auth, authData: null };
    default:
      return auth;
  }
};

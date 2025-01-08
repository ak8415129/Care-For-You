import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Actions/AuthActions";
const LogoutHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <div>
      <Button
        variant="contained"
        style={{ position: "absolute", top: "1.3vmin", right: "2vmin" }}
        onClick={onLogoutHandler}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutHandler;

import React, { useState } from "react";
import Input from "./Input";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import "./Auth.css";
import { login, logout, register } from "../../Actions/AuthActions";
import { useNavigate } from "react-router-dom";
import HospitalBg from "../../assets/images/auth.jpg";

const initialData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authFormData, setAuthFormData] = useState(initialData);
  const [authErrorMessage, setAuthErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (authFormData.name.length < 3 && !showLogin) {
      setAuthErrorMessage("Name should contain at least 3 characters");
    } else if (authFormData.email.length === 0) {
      setAuthErrorMessage("Email field is empty");
    } else if (authFormData.password.length < 5) {
      setAuthErrorMessage("Password should be at least 5 characters");
    } else if (!authFormData.confirmPassword && !showLogin) {
      setAuthErrorMessage("Confirm password field is empty");
    } else {
      if (showLogin) {
        dispatch(login(authFormData, navigate));
      } else {
        dispatch(register(authFormData, navigate));
      }
      setAuthFormData(initialData);
    }
  };

  const switchMode = () => {
    setShowLogin(!showLogin);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeData = (e) => {
    setAuthFormData({ ...authFormData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${HospitalBg})` }}
    >
      <form
        className="bg-white rounded-lg shadow-lg p-10 max-w-xl absolute right-5"
        onSubmit={onSubmitHandler}
      >
        <h1 className="text-3xl text-center mb-6 md:mb-8 lg:mb-12">
          Care for You
        </h1>
        {authErrorMessage && (
          <p className="text-red-500 text-sm mb-4">{authErrorMessage}</p>
        )}
        {!showLogin && (
          <Input
            name="name"
            label="Name"
            type="text"
            value={authFormData.name}
            handleChangeData={handleChangeData}
            autofocus
          />
        )}
        <Input
          name="email"
          label="Email"
          type="email"
          value={authFormData.email}
          handleChangeData={handleChangeData}
        />
        <Input
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={authFormData.password}
          handleShowPassword={handleShowPassword}
          handleChangeData={handleChangeData}
        />
        {!showLogin && (
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="text"
            value={authFormData.confirmPassword}
            handleChangeData={handleChangeData}
          />
        )}
        <div className="flex flex-col h-24 justify-between items-center mt-6">
          <Button variant="contained" color="primary" type="submit">
            {showLogin ? "Login" : "Register"}
          </Button>
          <Button variant="text" color="primary" onClick={switchMode}>
            {showLogin
              ? "Don't have the account? Click to register!"
              : "Already have the account? Click to login!"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;

import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const Input = ({
  name,
  label,
  autofocus,
  type,
  handleShowPassword,
  handleChangeData,
  value,
}) => {
  return (
    <TextField
      name={name}
      label={label}
      variant="outlined"
      autoFocus={autofocus}
      type={type}
      value={value}
      style={{ margin: "1rem", width: "30rem" }}
      onChange={(e) => {
        handleChangeData(e);
      }}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  );
};

export default Input;

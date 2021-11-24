import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={(fieldProps) => (
          <TextField
            fullWidth
            label={props.label || "Пароль"}
            type={showPassword ? "text" : "password"}
            className="input-field"
            {...fieldProps.field}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
    />
  );
};

export default PasswordField;

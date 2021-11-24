import { TextField } from "@mui/material";
import React from "react";
import InputMask from "react-input-mask";

const PhoneNumberField = ({label, ...props }) => {
  return (
    <InputMask
      alwaysShowMask
      mask="+\9\96\ 999 99 99 99"
      maskChar=" "
      {...props.field}
    >
      {(inputProps) => <TextField fullWidth id="outlined-basic" label={label || "Номер телефона"}  variant="outlined" className="input-field" {...inputProps} type="tel"/>}
    </InputMask>
  );
};
export default PhoneNumberField;

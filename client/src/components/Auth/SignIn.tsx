import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
//import "../../styles/fields.scss";
//import "../../styles/sign-in.scss";
import FieldError from "@c/Fields/FieldError";
import PasswordField from "@c/Fields/PasswordField";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
//import { signIn } from "../../store/actions/AuthActions";
//import withAlert from "@c/HOC/withAlert";

const schema = yup
  .object()
  .shape({
    login: yup.string().required("Укажите логин"),
    password: yup.string().required("Укажите пароль"),
  })
  .required();

const SignIn = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: ''
    },
    resolver: yupResolver(schema),
  });
  const { isLoading, error } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const onSubmit = (data) => data
  //dispatch(signIn(data));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column align-items-center sign-in"
    >
      <TextField
        {...register("login")}
        className="input-field"
        label="Логин"
        fullWidth
        variant="outlined"
      />
      {errors.login && <FieldError text={errors.login?.message} />}
      <PasswordField name={'password'}  control={control} />
      {errors.password && <FieldError text={errors.password?.message} />}
      {error && <FieldError text={error} />}
      <Button
        variant="contained"
        size="large"
        color="secondary"
        className="sign-in__btn"
        type="submit"
        disabled={isLoading}
      >
        Войти
      </Button>
    </form>
  );
};

export default SignIn;

import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Button, TextField} from "@mui/material";
import FieldError from "@c/Fields/FieldError";
import PasswordField from "@c/Fields/PasswordField";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {registrationAction} from "../../store/actions/AuthActions";
import {Link} from "react-router-dom";

const schema = yup
    .object()
    .shape({
        username: yup.string().required("Укажите имя пользователя"),
        email: yup.string().required("Укажите логин"),
        password: yup.string().required("Укажите пароль"),
    })
    .required();

const SignUp = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });
    const {isLoading, error} = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const onSubmit = (data) => dispatch(registrationAction(data));

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column align-items-center sign-in"
        >
            <TextField
                {...register("username")}
                className="input-field"
                label="Имя пользователя"
                fullWidth
                variant="outlined"
            />
            {errors.username && <FieldError text={errors.username?.message}/>}
            <TextField
                {...register("email")}
                className="input-field"
                label="Email"
                fullWidth
                variant="outlined"
            />
            {errors.email && <FieldError text={errors.email?.message}/>}
            <PasswordField name={"password"} control={control}/>
            {errors.password && <FieldError text={errors.password?.message}/>}
            {error && <FieldError text={error}/>}
            <Button
                variant="contained"
                size="large"
                color="secondary"
                className="sign-in__btn"
                type="submit"
                disabled={isLoading}
            >
                Зарегистрироваться
            </Button>
            <Link to="/sign-in">Войти</Link>
        </form>
    );
};

export default SignUp;

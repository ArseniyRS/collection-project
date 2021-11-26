import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Button, TextField} from "@mui/material";
import FieldError from "@c/Fields/FieldError";
import PasswordField from "@c/Fields/PasswordField";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {loginAction} from "../../store/actions/AuthActions";
import {Link} from "react-router-dom";
import {validateEmail} from "../../utils/validateEmail";

const schema = yup
    .object()
    .shape({
        email: yup.string().required("Укажите логин"),
        password: yup.string().required("Укажите пароль"),
    })
    .required();

const SignIn = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });
    const {isLoading, error} = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const onSubmit = (data) => {
        if (validateEmail(data.email))
            return dispatch(loginAction(data));
        return dispatch(loginAction({username: data.email, password: data.password}))
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column align-items-center sign-in"
        >
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
                Войти
            </Button>
            <Link to="/sign-up">Зарегистрироваться</Link>
        </form>
    );
};

export default SignIn;

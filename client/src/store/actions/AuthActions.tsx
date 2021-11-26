import {createAsyncThunk} from "@reduxjs/toolkit";
import {signInReq, signUpReq} from "../../api";

import {AppDispatch} from "../";
import {authSlice} from "../reducers/AuthSlice";


export const checkSessionAction = () => (dispatch: AppDispatch) => {
    if (localStorage.getItem("token"))
        return dispatch(authSlice.actions.changeAuthorization(true));
    return dispatch(authSlice.actions.changeAuthorization(false));
};
export const logoutAction = () => (dispatch: AppDispatch) => {
    localStorage.removeItem("token")
    return dispatch(authSlice.actions.changeAuthorization(false))
}
export const loginAction = createAsyncThunk(
    "auth/login",
    async (signInData, thunkAPI) => {
        try {
            const {data} = await signInReq(signInData);
            localStorage.setItem("token", data.token);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message || "Ошибка");
        }
    }
);

export const registrationAction = createAsyncThunk(
    "auth/registration",
    async (signUpData, thunkAPI) => {
        try {
            const {data} = await signUpReq(signUpData);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);



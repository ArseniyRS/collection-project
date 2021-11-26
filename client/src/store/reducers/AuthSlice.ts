import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {loginAction, registrationAction} from "../actions/AuthActions";

const initialState = {
  isAuthorized: false,
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuthorization(state, action: PayloadAction<boolean>){
      state.isAuthorized = action.payload
    }
  },
  extraReducers: {
    [registrationAction.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [registrationAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    [registrationAction.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /////////////////////////////////////
    [loginAction.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [loginAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isAuthorized = true;
    },
    [loginAction.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthorized: false,
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {},
});


export default authSlice.reducer
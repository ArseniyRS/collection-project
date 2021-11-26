import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice";

const rootReducer = combineReducers({
  authReducer,
});
export const store = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];

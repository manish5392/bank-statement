import { configureStore } from "@reduxjs/toolkit";
import StatementReducer from "./StatementSlice";

export const appStore = configureStore({
    reducer : {
        statement : StatementReducer,        
    }
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
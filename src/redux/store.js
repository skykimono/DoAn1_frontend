import { configureStore } from "@reduxjs/toolkit";
import userState  from "./user/userState";

export const store = configureStore({
    reducer: {
        userState: userState
    }
})
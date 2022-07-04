import { configureStore } from "@reduxjs/toolkit";
import userState  from "./user/userState";
import  poslistState  from "./post/postlistState";

export const store = configureStore({
    reducer : {
        userState: userState,
        poslistState: poslistState
    }
})
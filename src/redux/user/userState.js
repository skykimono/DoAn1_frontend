import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")) : ""

export const userState = createSlice({
    name: "userState",
    initialState: {
        token: token
    },
    reducers: {
        update: (state, action) => {

            state.token = action.payload;
        },
        logout: (state) => {
            state.token = ""
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refeshToken") //cookies
        }
    }
})
export const { update,logout } = userState.actions
export default userState.reducer

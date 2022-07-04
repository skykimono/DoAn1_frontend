import { createSlice } from "@reduxjs/toolkit";

const postlist = localStorage.getItem("postlist") ? JSON.parse(localStorage.getItem("postlist")) : []

export const poslistState = createSlice({
    name: "poslistState",
    initialState: {
        postlist: postlist
    },
    reducers: {
        postupdate: (state, action) => {
            state.postlist = action.payload;
            localStorage.setItem("postlist", JSON.stringify(action.payload))
        }
    }
})
export const { postupdate } = poslistState.actions
export default poslistState.reducer
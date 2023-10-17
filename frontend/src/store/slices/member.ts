import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchMember, postMember } from "#src/api/user";

export const memberListThunk = createAsyncThunk("memberList", async () => {
    const response = await fetchMember();
    return response.data;
});
export const postMemberThunk = createAsyncThunk("postMember", async (payload: any) => {
    const response = await postMember(payload);
    window.location.href = "/member";
    return response.data;
});

export const memberSlice = createSlice({
    name: "member",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(memberListThunk.fulfilled, (state, action) => {
            return state = [...action.payload];
        });
        // builder.addCase(memberListThunk.fulfilled, (state, action) => ([...state, ...action.payload]));
    },
});

export default memberSlice;

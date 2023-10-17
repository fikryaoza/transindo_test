import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchCategory, postCategory, updateCategory } from "#src/api/user";

export const categoryListThunk = createAsyncThunk("categoryList", async () => {
    const response = await fetchCategory();
    return response.data;
});

export const postCategoryThunk = createAsyncThunk("postCategory", async (payload: any) => {
    const response = await postCategory(payload);
    window.location.href = "/category";
    return response.data;
});

export const updateCategoryThunk = createAsyncThunk("postCategory", async (payload: any) => {
    const response = await updateCategory(payload);
    window.location.href = "/category";
    return response.data;
});

export const categorySlice = createSlice({
    name: "category",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(categoryListThunk.fulfilled, (state, action) => {
            return state = [...action.payload];
        });
        // builder.addCase(memberListThunk.fulfilled, (state, action) => ([...state, ...action.payload]));
    },
});

export default categorySlice;

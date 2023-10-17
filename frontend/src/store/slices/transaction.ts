import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchTransaction, updateTransaction, postTransaction } from "#src/api/user";

export const transactionListThunk = createAsyncThunk("bookList", async () => {
    const response = await fetchTransaction();
    return response.data;
});

export const updateTransactionThunk = createAsyncThunk("update_book_borrow", async (borrowPayload: any) => {
    const response = await updateTransaction(borrowPayload);
    window.location.href = "/transaction";
    return response.data;
});

export const postTransactionThunk = createAsyncThunk("update_book_borrow", async (borrowPayload: any) => {
    const response = await postTransaction(borrowPayload);
    window.location.href = "/transaction";
    return response.data;
});

export const transactionSlice = createSlice({
    name: "transaction",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(transactionListThunk.fulfilled, (state, action) => {
            return state = [...action.payload];
        });
        // builder.addCase(memberListThunk.fulfilled, (state, action) => ([...state, ...action.payload]));
    },
});

export default transactionSlice;

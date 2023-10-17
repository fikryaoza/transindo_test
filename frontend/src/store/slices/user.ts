import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchLogin, fetchUserInfo, fetchLogout, fetchMember } from "#src/api/user";
import type { FormInitialValues } from "#src/pages/login";

export const authLoginThunk = createAsyncThunk("auth/login", async (loginPayload: FormInitialValues) => {
	const response = await fetchLogin(loginPayload);
	const { access_token, user } = response.data;
	window.localStorage.setItem("token", access_token);
	window.localStorage.setItem("user", JSON.stringify(user));
	window.location.href = "/";
	return access_token;
});

export const authLogoutThunk = createAsyncThunk("auth/logout", async () => {
	const response = await fetchLogout();
	window.localStorage.removeItem("token");
	window.location.href = "/login";
	return response;
});

export interface UserinfoType {
	id: string;
	name: string;
	email: string;
	avatar: "https://p6-passport.byteacctimg.com/img/user-avatar/16981ccf6c67324125a416ddccee33cb~90x90.awebp";
	desc: "manager";
	permissions?: {
		label: string;
		value: string;
	}[];
}

export const userInfoThunk = createAsyncThunk("userinfo", async () => {
	const localData = window.localStorage.getItem("user")
	let user = JSON.parse(localData)
	user.avatar = "https://p6-passport.byteacctimg.com/img/user-avatar/16981ccf6c67324125a416ddccee33cb~90x90.awebp";

	return user as Record<"user", UserinfoType>;
});

// export const userInfoThunk = createAsyncThunk("userinfo", async () => {
// 	const response = await fetchUserInfo();
// 	return response.result;
// });

export const userSlice = createSlice({
	name: "user",
	initialState: {
		token: window.localStorage.getItem("token"),
		userId: "",
		username: "",
		realName: "",
		avatar: "",
		desc: "",
		password: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(authLoginThunk.fulfilled, (state, action) => {
			state.token = action.payload;
		});
		builder.addCase(userInfoThunk.fulfilled, (state, action) => ({ ...state, ...action.payload }));
	},
});

export default userSlice;

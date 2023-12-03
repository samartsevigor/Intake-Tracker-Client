import { createSlice } from "@reduxjs/toolkit";

import type { InitialStateTypes } from "./types";

import {
	authLoginThunk,
	getUserInfoThunk,
} from "#src/store/slices/user/actions";
import { ACCESS_TOKEN } from "#src/constants/constants";

const initialState: InitialStateTypes = {
	email: "",
	isFetching: true,
	isSuccess: false,
	isError: false,
	accessToken: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: () => {
			localStorage.removeItem(ACCESS_TOKEN);
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authLoginThunk.fulfilled, (state, { payload }) => {
				state.email = payload.user.email;
				state.isFetching = false;
				state.isSuccess = true;
				state.accessToken = payload.token;
			})
			.addCase(authLoginThunk.rejected, (state) => {
				state.isFetching = false;
				state.isError = true;
			})
			.addCase(getUserInfoThunk.pending, (state) => {
				state.isFetching = true;
			})
			.addCase(getUserInfoThunk.fulfilled, (state, action) => {
				state.email = action.payload.email;
				state.isFetching = false;
				state.accessToken = localStorage.getItem(ACCESS_TOKEN) || "";
			})
			.addCase(getUserInfoThunk.rejected, (state) => {
				state.isFetching = false;
			});
	},
});

export const { logout } = userSlice.actions;

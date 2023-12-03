import { createAsyncThunk } from "#node_modules/@reduxjs/toolkit";
import type { FormInitialValues } from "#src/pages/login";
import axiosInstance from "#src/utils/request";
import { ACCESS_TOKEN } from "#src/constants/constants";
import toast from "#node_modules/react-hot-toast";

export const authLoginThunk = createAsyncThunk(
	"auth/login",
	async (loginPayload: FormInitialValues, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.post("/auth/login", {
				...loginPayload,
			});
			localStorage.setItem(ACCESS_TOKEN, data.token);
			return data;
		} catch (error) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			toast.error(error.response.data.message);
			return rejectWithValue(error);
		}
	},
);

export const authRegisterThunk = createAsyncThunk(
	"auth/login",
	async (registerPayload: FormInitialValues, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.post("/auth/signup", {
				...registerPayload,
			});
			localStorage.setItem(ACCESS_TOKEN, data.token);
			return data;
		} catch (error) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			toast.error(error.response.data.message);
			return rejectWithValue(error);
		}
	},
);

export const getUserInfoThunk = createAsyncThunk(
	"auth/userInfo",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance("/user/me");
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

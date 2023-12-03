import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./slices/user/user";
import { medicationSlice } from "./slices/medication/medication";

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		medication: medicationSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

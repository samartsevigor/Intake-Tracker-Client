import { createSlice } from "@reduxjs/toolkit";

import {
	addNewMedication,
	deleteMedication,
	getMedications,
	updateMedication,
} from "#src/store/slices/medication/actions";
import type { InitialStateTypes } from "#src/store/slices/medication/types";

const initialState: InitialStateTypes = {
	medications: [],
};

export const medicationSlice = createSlice({
	name: "medications",
	initialState,
	reducers: {
		clearMedications: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMedications.fulfilled, (state, { payload }) => {
				state.medications = payload;
			})
			.addCase(updateMedication.fulfilled, (state, { payload }) => {
				const index = state.medications.findIndex(
					(med) => med.id === payload.id,
				);
				if (index !== -1) {
					state.medications[index] = payload;
				}
			})
			.addCase(addNewMedication.fulfilled, (state, { payload }) => {
				state.medications = [payload, ...state.medications];
			})
			.addCase(deleteMedication.fulfilled, (state, { payload }) => {
				state.medications = state.medications.filter(
					(med) => med.id !== payload.id,
				);
			});
	},
});

export const { clearMedications } = medicationSlice.actions;

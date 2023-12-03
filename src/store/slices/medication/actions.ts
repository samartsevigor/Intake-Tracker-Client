import { createAsyncThunk } from "#node_modules/@reduxjs/toolkit";
import axiosInstance from "#src/utils/request";
import type { Medication } from "#src/store/slices/medication/types";

export const getMedications = createAsyncThunk(
	"medication/getMedications",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance("/medication");
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const updateMedication = createAsyncThunk<
	Medication,
	{ id: number; medication: Partial<Medication> }
>(
	"medication/updateMedication",
	async ({ id, medication }, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.put(`/medication/${id}`, medication);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const addNewMedication = createAsyncThunk<
	Medication,
	Partial<Medication>
>("medication/addNewMedication", async (medication, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.post("/medication", medication);
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteMedication = createAsyncThunk<Medication, number>(
	"medication/deleteMedication",
	async (id, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.delete(`/medication/${id}`);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

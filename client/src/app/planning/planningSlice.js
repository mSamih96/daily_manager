import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const createPlanning = async () => {
	return (await fetch("http://localhost:3003/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	})).json();
}

export const createPlanningThunk = createAsyncThunk("planning/create", async () => {
	let response = await createPlanning();
	return response;
});


const planningSlice = createSlice({
	name: "planning",
	initialState: {
		planning: null,
		planningLoading: false,
		counter: 0,
	},
	reducers: {
		setCounter: (state, action) => {
			state.counter = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createPlanningThunk.fulfilled, (state, action) => {
			if (action.payload._id) {
				state.loading = false;
				state.planning = action.payload;
			}
		}).addCase(createPlanningThunk.pending, (state) => {
			state.loading = true;
		});
	}
});

export const { setCounter } = planningSlice.actions;

export default planningSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let getProjects = async () => {
	return (await fetch("http://localhost:3002/")).json();
}

let postProjects = async (d) => {
	return (await fetch("http://localhost:3002", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(d),
	})).json();
}

export const getProjectThunk = createAsyncThunk("home/getProject", async () => {
	let response = await getProjects();
	return response;
});

export const postProjectThunk = createAsyncThunk("home/postProject", async (d) => {
	let response = await postProjects(d);
	return response;
});

export const homeSlice = createSlice({
	name: "home",
	initialState: {
		projects: [],
		loading: true,
	},
	extraReducers: (builder) => {
		builder.addCase(getProjectThunk.fulfilled, (state, action) => {
			state.projects = action.payload;
			state.loading = false;
		});

		builder.addCase(postProjectThunk.fulfilled, (state, action) => {
			if (action.payload.name && action.payload.description)
				state.projects.push(action.payload);
		});
	}
});

export default homeSlice.reducer;

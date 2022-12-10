import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getProject = async (id) => {
	return (await fetch(`http://localhost:3002/${id}`)).json();
}

const deleteProject = async (id) => {
	return (await fetch(`http://localhost:3002/${id}`, {
		method: "DELETE",
	})).json();
}

const createTask = async (data) => {
	return (await fetch("http://localhost:3001/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
		body: JSON.stringify(data),
	})).json();
}

const deleteTask = async (data) => {
	return (await fetch(`http://localhost:3001/${data.id_project}/${data.id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
		body: JSON.stringify(data),
	})).json();
}

export const deleteTaskThunk = createAsyncThunk("project/deleteTask", async (data) => {
	let response = await deleteTask(data);
	return response;
});

export const getProjectThunk = createAsyncThunk("project/getProject", async (id) => {
	let response = await getProject(id);
	return response;
});

export const deleteProjectThunk = createAsyncThunk("project/deleteProject", async (id) => {
	let response = await deleteProject(id);
	return response;
});

export const createTaskThunk = createAsyncThunk("project/createTask", async (data) => {
	let response = await createTask(data);
	return response;
});

const projectSlice = createSlice({
	name: "project",
	initialState: {
		project: null,
		redirect: false,
	},
	reducers: {
		resetRedirect: (state) => {
			state.project = null;
			state.redirect = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getProjectThunk.fulfilled, (state, action) => {
			if (action.payload._id) {
				state.project = action.payload;
			} else {
				state.redirect = true
			}
		});

		builder.addCase(deleteProjectThunk.fulfilled, (state, action) => {
			state.project = null;
			state.redirect = true;
		});

		builder.addCase(createTaskThunk.fulfilled, (state, action) => {
			if (action.payload._id) state.project.tasks.push(action.payload);
		});

		builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
			if (action.payload._id) state.project = action.payload;
		});
	}
});

export const { resetRedirect } = projectSlice.actions;

export default projectSlice.reducer;

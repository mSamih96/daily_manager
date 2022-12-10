import { configureStore } from "@reduxjs/toolkit";
import home from "./home/homeSlice.js";
import project from "./project/projectSlice.js";
import planning from "./planning/planningSlice.js";

export const store = configureStore({
	reducer: {
		home,
		project,
		planning,
	}
});

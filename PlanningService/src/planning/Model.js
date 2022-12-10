const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	name: String,
	description: String,
	deadline: Date,
	estimated_duration: {
		type: Number,
		required: true,
	},
	status: {
		type: Number,
		default: 0,
	}
}, { collection: "projects.tasks" });

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: String,
	estimated_deadline: Date,
	tasks: [TaskSchema],
}, { collection: "projects" });

const PlanningSchema = new mongoose.Schema({
	started_at: {
		type: Date,
		default: Date.now(),
	},
	closed_at: Date,
	tasks: {
		type: [TaskSchema],
		default: [],
	}
});

module.exports = { 
	Model: mongoose.model("Planning", PlanningSchema),
	Project: mongoose.model("project", ProjectSchema),
}

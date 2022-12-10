const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	id_project: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	deadline: {
		type: Date,
	},
	estimated_duration: {
		type: Number,
		required: true
	},
	finished: {
		type: Boolean,
		default: false,
	},
	open: {
		type: Boolean,
		default: true,
	}
}, { collection: "task" });

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: String,
	estimated_deadline: Date,
	tasks: [TaskSchema]
});

module.exports = mongoose.model("Project", ProjectSchema);

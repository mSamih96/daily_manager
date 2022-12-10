const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	id_project: {
		type: String,
		required: true
	},
	name: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		required: true
	},
	deadline: {
		type: Date,
	},
	estimated_duration: { 
		type: Number,
		required: true,
	},
	status: {
		type: Number,
		default: 0,
	}
});

const ProjectSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
                unique: true,
        },
        description: String,
        estimated_deadline: Date,
        tasks: [TaskSchema]
}, { collection: "projects" });

module.exports = {
	Model: mongoose.model("task", TaskSchema),
	ParentModel: mongoose.model("project", ProjectSchema),
}

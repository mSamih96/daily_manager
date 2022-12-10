const { Model, ParentModel } = require("./Model.js");

module.exports = {
	getTasks: async (req, res) => {
		let projects = await ParentModel.find({}, { _id: 0, tasks: 1 });
		let tasks = [];
		projects.forEach((v) => {
			tasks = [...tasks, ...v.tasks]
		});
		return res.send(tasks);
	},
	createTask: async (req, res) => {
		const { id_project, name, description, estimated_duration } = req.body;
		if (!name || !id_project || !description || !estimated_duration) 
			return res.sendStatus(400);
		let task = new Model({
			id_project,
			name,
			description,
			estimated_duration,
		});
		let project = await ParentModel.findOne({_id: id_project});
		if (!project) return res.sendStatus(400);
		project.tasks.push(task);
		try {
			await project.save();
			return res.status(201).send(task);
		} catch(err) {
			return res.status(500).send(err);
		}
	},
	getTask: async (req, res) => {
		try {
			const { id, id_project } = req.params;
			const project = await ParentModel.findOne({_id: id_project});
			const task = project.tasks.id(id);
			if (task) return res.send(task);
			else return res.sendStatus(404);
		} catch(err) {
			return res.status(404).send(err);
		}
	},
	editTask: async (req, res) => {
		const { id, id_project } = req.params;
		let project = await ParentModel.findOneAndUpdate({"_id": id_project, "tasks._id": id}, {
			"$set": {
				"tasks.$.description": req.body.description,
				"tasks.$.estimated_duration": req.body.estimated_duration,
			}			
		});
		if (!project) return res.sendStatus(404);
		return res.send(project);
	},
	deleteTask: async (req, res) => {
		const { id, id_project } = req.params;
		const project = await ParentModel.findOne({_id: id_project});
		project.tasks.id(id).remove();
		await project.save()
		if (!project) return res.sendStatus(404);
		return res.send(project);
	},
};

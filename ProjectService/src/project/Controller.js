const Model = require("./Model.js");

module.exports = {
	getProjects: async (req, res) => {
		let projects = await Model.find({});
		return res.send(projects);
	},
	createProject: async (req, res) => {
		let { name, description } = req.body;
		if (!name || !description) return res.sendStatus(400);
		try {
			let model = new Model({name, description});
			let project = await model.save();
			if (!project) return res.sendStatus(400);
			return res.status(201).send(project);
		} catch(err) {
			return res.status(500).send(err);
		}
	},
	getProject: async (req, res) => {
		let { id } = req.params;
		if (!id) return res.sendStatus(404)
		try {
			let project = await Model.findOne({_id: id});
			if (!project) return res.sendStatus(404);
			return res.send(project);
		} catch(err) {
			return res.status(404).send(err);
		}
	},
	updateProject: async (req, res) => {
		const { id } = req.params;
		if (!id) return res.sendStatus(404);
		try {
			let project = await Model.findOneAndUpdate({_id: id}, req.body);
			if (!project) return res.sendStatus(404);
			return res.send(project);
		} catch(err) {
			return res.status(404).send(err);
		}
	},
	deleteProject: async (req, res) => {
		const { id } = req.params;
		if (!id) return res.sendStatus(404);
		try {
			let project = await Model.findOneAndDelete({_id: id});
			return res.send(project);
		} catch(err) {
			return res.status(404).send(err);
		}
	}
};

const { Model, Project }  = require("./Model.js");

module.exports = {
	getPlannings: async (req, res) => {
		const planningList = await Model.find({});
		return res.send(planningList);
	},
	createPlanning: async (req, res) => {
		let tasks = [];
		(await Project.find({}, {_id: 0, tasks: 1})).forEach((v) => {
			tasks = [...tasks, ...v.tasks].sort((a, b) => {
				return a.estimated_duration + b.estimated_duration
			});
		});
		let prioritary_tasks = []
		for (let i = 0, task = tasks[i], counter = 0; 
		i < tasks.length && counter < 60; i++, task = tasks[i]) {
			counter += task.estimated_duration;
			prioritary_tasks.push(task);
		}
		let planning = new Model({
			tasks: prioritary_tasks,
		});
		planning = await planning.save();
		if (!planning) return res.sendStatus(400);
		return res.status(201).send(planning);
	},
	getPlanning: async (req, res) => {
		const { planning_id } = req.params;
		const planning = await Model.findOne({_id: planning_id});
		if (!planning) return res.sendStatus(404);
		return res.send(planning);
	},
	addTask: async (req, res) => {
		const { planning_id } = req.params;
		const { task } = req.body;
		let planning = await Model.findOne({_id: planning_id});
		if (!task._id) {
			return res.sendStatus(400);
		} else if (!planning) { 
			return res.sendStatus(404);
		}
		planning.tasks.push(task);
		planning = await planning.save();
		if (!planning) return res.sendStatus(500);
		return res.send(planning);
	},
	deletePlanning: async (req, res) => {
		const { planning_id, task_id } = req.params;
		const planning = await Model.findOne({_id: planning_id});
		if (!planning) return res.sendStatus(404);
		planning.tasks.id(task_id).remove();
		planning = await planning.save();
		if (!planning) return res.sendStatus(500);
		return res.send(planning);
	}
}

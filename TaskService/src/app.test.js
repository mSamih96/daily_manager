let request = require("supertest");
let app = require("./app.js");
let { ParentModel, Model } = require("./task/Model.js");
require("./db/mongoose.js");

let task = {
	id_project: 1,
	description: "Hello world",
	estimated_duration: 25,
}

let modified_task = {
	id_project: 0,
        description: "Hello buddy",
        estimated_duration: 35,
}

const project = {
        name: "Projet 1",
        description: "test 1234",
	tasks: []
} 

beforeEach(async () => {
	let parent_model = new ParentModel(project);
	await ParentModel.deleteMany({});
	await Model.deleteMany({});
	let p = await parent_model.save();
	task.id_project = p._id;
	modified_task.id_project = p._id;
});

describe("GET /", () => {
	it("Should respond with 200 status code", async () => {
		await request(app).post("/").send(task);
		let response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
	});
});

describe("GET /:id_project/:id_task", () => {
	it("Should respond with 200 status code", async () => {
		let t = await request(app).post("/").send(task);
		let response = await request(app).get(`/${t.body.id_project}/${t.body._id}`);
		expect(response.statusCode).toBe(200);
	});

	it("Should respond with 404 status code", async () => {
                let response = await request(app).get("/id_task");
                expect(response.statusCode).toBe(404);
        });

});

describe("POST /", () => {
	it("Should respond with 201 status code", async () => {
		let response = await request(app).post("/").send(task);
		expect(response.statusCode).toBe(201);
	});

	it("Should respond with 400 status code", async () => {
		let response = await request(app).post("/").send({});
		expect(response.statusCode).toBe(400);
	});

	it("Should respond with task", async () => {
		let response = await request(app).post("/").send(task);
		expect(response.body.description).toEqual(task.description);
	});
});

describe("PUT /:id_project/:id_task", () => {
	it("Should respond with 200 status code", async () => {
		let t = await request(app).post("/").send(task);
		let r = await request(app).put(`/${t.body.id_project}/${t.body._id}`).send(modified_task);
		let response = await request(app).get(`/${t.body.id_project}/${t.body._id}`);
		expect(response.statusCode).toBe(200);
	});

	it("Should respond with modified task", async () => {
		let t = await request(app).post("/").send(task);
		let r = await request(app).put(`/${t.body.id_project}/${t.body._id}`).send(modified_task);
                let response = await request(app).get(`/${t.body.id_project}/${t.body._id}`);
		expect(response.body.description).toBe(modified_task.description);
	});
});

describe("DELETE /:id_project/:id_task", () => {
	it("Should respond with 200 status code", async () => {
		let t = await request(app).post("/").send(task);
		let response = await request(app).delete(`/${t.body.id_project}/${t.body._id}`);
		expect(response.statusCode).toBe(200);
	});

	it("Should respond with empty tasks", async () => {
		let t = await request(app).post("/").send(task);
		let response = await request(app).delete(`/${t.body.id_project}/${t.body._id}`);
		expect(response.body.tasks.length).toBe(0);
	});
});

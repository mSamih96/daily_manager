const request = require("supertest");
const app = require("./app.js");
const { Model, Project } = require("./planning/Model.js");
require("./db/mongoose.js");

const planning = {
	tasks: [],
}

const project = {
	name: "Test",
	description: "Test test",
	tasks: [
		{ name: "test task", description: "OkOk", estimated_duration: 45 },
	],
}

const project1 = {
	name: "Test 2",
	description: "Test test",
	tasks: [
		{ name: "Zboub", description: "Yo okok", estimated_duration: 25 },
	]
}

beforeEach(async () => {
	let p = new Project(project);
	let p1 = new Project(project1);
	await Model.deleteMany({});
	await Project.deleteMany({});
	await p.save();
	await p1.save();
});

describe("GET /", () => {
	it("Should respond with 200 status code", async () => {
		let response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
	});

	it("Should respond with array", async () => {
		let response = await request(app).get("/");
		expect(typeof response.body).toBe("object");
	});
});

describe("GET /:id", () => {
	it("Should respond with 200 status code", async () => {
		let id = (await request(app).post("/").send(planning)).body._id;
		let response = await request(app).get(`/${id}`);
		expect(response.statusCode).toBe(200);
	});
});

describe("POST /", () => {
	it("Should respond with 201 status code", async () => {
		let response = await request(app).post("/").send(planning);
		expect(response.statusCode).toBe(201);
	});

	it("Should respond with object", async () => {
		let response = await request(app).post("/").send(planning);
		console.log(response.body);
		expect(response.body._id).not.toBe(null);
	});
});

describe("DELETE /:id", () => {
	it("Should respond with 200 status code", async () => {
		let id = (await request(app).post("/").send(planning)).body._id;
		let response = await request(app).delete(`/${id}`);
		expect(response.statusCode).toBe(200);
	});
});

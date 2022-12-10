const request = require("supertest");
const app = require("./app.js");
const model = require("./project/Model.js")
require("./db/mongoose.js");

let project = {
	name: "Daily Manager",
	description: "Application de gestion des taches journaliere",
}

beforeEach(async () => {
	await model.deleteMany({});
});


describe("GET /", () => {
	it("Should respond with 200 status code", async () => {
		let response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
	});
});

describe("POST /", () => {
	it("Should respond with 201 status code", async () => {
		let response = await request(app).post("/").send(project);
		expect(response.statusCode).toBe(201);
	});

	it("Should respond with 400 status code", async () => {
		let response = await request(app).post("/").send({});
		expect(response.statusCode).toBe(400);
	});

	it("Should respond with json object body", async () => {
		let response = await request(app).post("/").send(project);
		expect(response.body._id).toBeDefined();
	});
});

describe("GET /:id_project", () => {
	it("Should respond with 200 status code", async () => {
		let p = await request(app).post("/").send(project);
		let response = await request(app).get(`/${p.body._id}`);
		expect(response.statusCode).toBe(200);
	});

	it("Should respond with 404 status code", async () => {
		let response = await request(app).get("/random");
		expect(response.statusCode).toBe(404);
	});

	it("Should respond with json object body", async () => {
		let p = await request(app).post("/").send(project);
		let response = await request(app).get(`/${p.body._id}`);
		expect(response.body._id).toBeDefined();
	});
});


describe("PUT /:id_object", () => {
	it("Should respond with 200 status code", async () => {
		let p = await request(app).post("/").send(project);
		let response = await request(app).put(`/${p.body._id}`);
		expect(response.statusCode).toBe(200);
	});

	it("Should respond with 404 status code", async () => {
		let response = await request(app).put("/something").send(project);
		expect(response.statusCode).toBe(404);
	});

	it("Should respond with modified object", async () => {
		let p = await request(app).post("/").send(project);
		let u_p = await request(app).put(`/${p.body._id}`).send({
			name: "Hello",
		});
		let response = await request(app).get(`/${p.body._id}`);
		expect(response.body).not.toEqual(p.body);
	});
});

describe("DELETE /:id_object", () => {
	it("Should repond with 200 status code", async () => {
		let p = await request(app).post("/").send(project)
		let response = await request(app).delete(`/${p.body._id}`);
		expect(response.statusCode).toBe(200);
	});

	it("Should respond with 404 status code", async () => {
		let response = await request(app).delete("/hello");
		expect(response.statusCode).toBe(404);
	});

	it("Should respond with deleted object", async () => {
		let p = await request(app).post("/").send(project);
		let response = await request(app).delete(`/${p.body._id}`);
		expect(response.body._id).toBeDefined()
	});
});

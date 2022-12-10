const express = require("express");
const cors = require("cors");
const project = require("./project/Router.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(project);

module.exports = app;

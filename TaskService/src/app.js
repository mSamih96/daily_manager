const express = require("express");
const cors = require("cors");
const task = require("./task/Router.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(task);

module.exports = app;

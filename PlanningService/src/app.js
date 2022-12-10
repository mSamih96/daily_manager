const express = require("express");
const cors = require("cors");
const planning = require("./planning/Router.js");
const app = express();


app.use(cors());
app.use(express.json());
app.use(planning);

module.exports = app;

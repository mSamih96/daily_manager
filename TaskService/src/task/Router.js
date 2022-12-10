const router = require("express").Router();
const { getTasks, getTask, createTask, editTask, deleteTask } = require("./Controller.js");


router.get("/", getTasks);
router.get("/:id_project/:id", getTask);
router.post("/", createTask);
router.put("/:id_project/:id", editTask);
router.delete("/:id_project/:id", deleteTask);

module.exports = router;

const router = require("express").Router();
const { getProjects, createProject, getProject, deleteProject, updateProject } = require("./Controller.js");

router.get("/", getProjects);
router.post("/", createProject);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;

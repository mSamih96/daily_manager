const router = require("express").Router();
const { getPlannings, getPlanning, createPlanning, deletePlanning, addTask } = require("./Controller.js");

router.get("/", getPlannings);
router.get("/:planning_id", getPlanning);
router.post("/", createPlanning);
router.put("/:planning_id", addTask);
router.delete("/:planning_id", deletePlanning);

module.exports = router;

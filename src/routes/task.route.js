const { Router } = require("express");
const taskCtrl = require("../controllers/task.controller");
const router = Router();

router.post("/create", taskCtrl.createNewTask);
router.get("/:id", taskCtrl.getTaskById);
router.put("/:id", taskCtrl.updateTasktById);
router.delete("/:id", taskCtrl.deleteTaskById);
module.exports = router;

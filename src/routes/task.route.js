const { Router } = require("express");
const taskCtrl = require("../controllers/task.controller");
const router = Router();

router.post("/", taskCtrl.createTask);
router.get("/:taskId", taskCtrl.getTaskById);
router.put("/:taskId", taskCtrl.updateTask);
router.delete("/:taskId", taskCtrl.deleteTask);

module.exports = router;

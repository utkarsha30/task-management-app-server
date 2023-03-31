const { Router } = require("express");
const taskCtrl = require("../controllers/task.controller");
const { authenticate, authorize } = require('../middleware/auth');
const router = Router();

router.post("/", authenticate, taskCtrl.createTask);
router.get("/:taskId", authenticate, taskCtrl.getTaskById);
router.put("/:taskId", authenticate, authorize("employee"), taskCtrl.updateTask);
router.delete("/:taskId", authenticate, authorize("admin"), taskCtrl.deleteTask);

module.exports = router;

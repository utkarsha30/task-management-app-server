<<<<<<< HEAD
const { Router } = require('express');
const taskCtrl = require('../controllers/task.controller');
const { authenticate, authorize } = require('../middleware/auth');
const router = Router();

router.post('/', authenticate, taskCtrl.createTask);
router.put('/:taskId', authenticate, taskCtrl.updateTask);
router.get('/:taskId', authenticate, taskCtrl.getTaskById);

router.delete(
  '/:taskId',
  authenticate,
  authorize('admin'),
  taskCtrl.deleteTask
);
=======
const { Router } = require("express");
const taskCtrl = require("../controllers/task.controller");
const { authenticate, authorize } = require('../middleware/auth');
const router = Router();

router.post("/", authenticate, taskCtrl.createTask);
router.get("/:taskId", authenticate, taskCtrl.getTaskById);
router.put("/:taskId", authenticate, authorize("employee"), taskCtrl.updateTask);
router.delete("/:taskId", authenticate, authorize("admin"), taskCtrl.deleteTask);
>>>>>>> bc71801d552503235670ef94444d99511aa3543e

module.exports = router;

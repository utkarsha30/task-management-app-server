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

module.exports = router;

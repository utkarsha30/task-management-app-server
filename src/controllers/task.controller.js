const taskService = require("../services/task.service");

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.params.id, req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.taskId);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.taskId, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.taskId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

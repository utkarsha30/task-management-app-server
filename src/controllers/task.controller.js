const taskService = require("../services/task.service");
const { Errors } = require("../constants");

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

exports.updateTask = async (req, res, next) => {
  const loggedinUser = res.locals.claims;
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to create new project`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const validAssignee = await taskService.validateTaskByAssigneeId(
      req.params.taskId,
      loggedinUser._id
    );
    if (validAssignee.length === 0) {
      const error = new Error(
        `Task ${req.params.taskId} is not assigend to employee ${loggedinUser._id}`
      );
      error.name = Errors.NotFound;
      return next(error);
    }
    const task = await taskService.updateTask(req.params.taskId, req.body);
    console.log(task);
    res.status(200).json(task);
  } catch (error) {
   next(error);
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

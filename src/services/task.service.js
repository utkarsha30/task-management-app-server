const Task = require("../models/task");

exports.createTask = async (projectId, taskData) => {
  const task = new Task(taskData);
  task.projectId = projectId;
  await task.save();
  return task;
};

exports.getTaskById = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error(`Task with ID ${taskId} not found`);
  }
  return task;
};

exports.updateTask = async (taskId, taskData) => {
  const task = await getTaskById(taskId);
  Object.assign(task, taskData);
  await task.save();
  return task;
};

exports.deleteTask = async (taskId) => {
  const task = await getTaskById(taskId);
  await task.remove();
};

// exports.addAssignee = async (taskId, assignedToId) => {
//   const task = await Task.findById(taskId);
//   task.assignedTo.push(assignedToId);
//   return await project.save();
// };

const { default: mongoose } = require("mongoose");
const Task = require("../models/task");
//const mongoose = require("mongoose");

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
  // const task = await getTaskById(taskId);
  // Object.assign(task, taskData);
  // await task.save();
  // return task;

  return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

exports.deleteTask = async (taskId) => {
  // const task = await getTaskById(taskId);
  // await task.remove();
  return await task.findByIdAndDelete(taskId);
};

// exports.addAssignee = async (taskId, assignedToId) => {
//   const task = await Task.findById(taskId);
//   task.assignedTo.push(assignedToId);
//   return await project.save();
// };

exports.validateTaskByAssigneeId = (taskId, assigneeId) => {
  const _id = new mongoose.Types.ObjectId(taskId);
  return Task.find({ $and: [{ _id }, { assignedTo: assigneeId }] });
};

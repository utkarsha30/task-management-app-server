const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Task = mongoose.model("Task");

const createNewTask = (details) => {
  return Task.create(details);
};

module.exports = {
  createNewTask,
};

const mongoose = require("mongoose");
const Project = mongoose.model("Project");

const createNewProject = (details) => {
  return Project.create(details);
};

module.exports = { createNewProject };

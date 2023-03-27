const Project = require("../models/project");

exports.createProject = async (projectData) => {
  const project = new Project(projectData);
  return await project.save();
};

exports.getProjectById = async (projectId) => {
  return await Project.findById(projectId)
    .populate("organizer")
    .populate("contributors")
    .populate("tasks");
};

exports.updateProject = async (projectId, projectData) => {
  return await Project.findByIdAndUpdate(projectId, projectData, { new: true });
};

exports.deleteProject = async (projectId) => {
  return await Project.findByIdAndDelete(projectId);
};

exports.addContributor = async (projectId, contributorId) => {
  const project = await Project.findById(projectId);
  project.contributors.push(contributorId);
  return await project.save();
};

exports.removeContributor = async (projectId, contributorId) => {
  const project = await Project.findById(projectId);
  project.contributors.pull(contributorId);
  return await project.save();
};

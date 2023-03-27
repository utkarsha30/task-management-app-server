const projectService = require("../services/project.service");
const { Errors } = require("../constants");

exports.createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await projectService.deleteProject(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addContributor = async (req, res) => {
  try {
    const project = await projectService.addContributor(
      req.params.id,
      req.body.contributorId
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeContributor = async (req, res) => {
  try {
    const project = await projectService.removeContributor(
      req.params.id,
      req.body.contributorId
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

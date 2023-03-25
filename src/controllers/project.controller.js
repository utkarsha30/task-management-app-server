// const projectService = require("../services/project.service");
const Project = require("../models/project");
const { Errors } = require("../constants");

//Get all projects
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      $or: [
        { organizer: req.employee._id },
        { contributors: req.employee._id },
      ],
    })
      .populate("organizer", "_id name")
      .populate("contributors", "_id name")
      .populate("tasks");
    res.json(projects);
  } catch (error) {
    next(error);
    // console.error(error);
    // res.status(500).send(error);
  }
};

//Create a new Project
exports.createNewProject = async (req, res, next) => {
  try {
    const project = new Project({
      name: req.body.name,
      organizer: req.employee._id,
      contributors: req.body.contributors || [],
      tasks: [],
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    // console.error(error);
    // res.status(500).send(error);
    next(error);
  }
};

//Get a Single project by _id
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      $or: [
        { organizer: req.employee._id },
        { contributors: req.employee._id },
      ],
    })
      .populate("organizer", "_id name")
      .populate("contributors", "_id name")
      .populate("tasks");
    if (!project) {
      return res.status(404).json({ error: "Project Not Found" });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

//Update a Project by ID
exports.updateProjectById = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      organizer: req.employee._id,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    project.name = req.body.name;
    project.contributors = req.body.contributors || [];
    await project.save();
    res.json(project);
  } catch (error) {
    next(error);
  }
};

//Delete a Project by ID
exports.deleteProjectById = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      organizer: req.employee._id,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    await project.remove();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

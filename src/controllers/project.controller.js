const projectService = require("../services/project.service");
const { Errors } = require("../constants");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.createNewProject = async (req, res) => {
  try {
    const newProject = await projectService.createNewProject(req.body);
    res.status(201).json(newEmployee);
    // const project = new Project(req.body);
    // await project.save();
    // res.send(project);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

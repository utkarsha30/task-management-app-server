const projectService = require("../services/project.service");
const { Errors } = require("../constants");

exports.createProject = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to create new project`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const loggedinUser = res.locals.claims;
    req.body.organizer = loggedinUser._id;
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
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

exports.updateProject = async (req, res, next) => {
  const loggedinUser = res.locals.claims;
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to create new project`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const validOrganizer = await projectService.validateProjectByOrganizerId(
      req.params.id,
      loggedinUser._id
    );
    if (validOrganizer.length === 0) {
      const error = new Error(
        `Task ${req.params.id} is not
         assigend to employee ${loggedinUser._id}`
      );
      error.name = Errors.NotFound;
      return next(error);
    }

    const project = await projectService.updateProject(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    next(error);
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
    const loggedinUser = res.locals.claims;
    req.body.organizer = loggedinUser._id;
    const project = await projectService.addContributor(
      req.params.id,
      req.body
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

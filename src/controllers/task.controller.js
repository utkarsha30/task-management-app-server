const taskService = require("../services/task.service");
const { Errors } = require("../constants");

//Create new task
const createNewTask = async(req,res,next)=>{
    if (Object.keys(req.body).length === 0) {
        const error = new Error(
          `Request body is missing, and needs to create new task and add task details`
        );
        error.name = Errors.BadRequest;
        return next(error);
      }
      try{
        const createNewTask = await taskService.createNewTask(req.body);
        res.status(201).json(newTask);

      }catch(error){
        return next(error);
      }
}

//Read task by ID
const getTaskById = async(req, res, next) =>{
  try {
    const examples = await Task.find();
    res.send(examples);
  } catch (err) {
    res.status(500).send(err);
  }
}

//Update task by ID (Currently you can update only
// title, description, status and assignedTo)
const updateTaskById = async(req, res, next)=>{
  const { id } = req.params;
  const { title, description, status, assignedTo } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).send('Task not found');
    }

    if (title) {
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    if (status) {
      task.status = status;
    }

    if (assignedTo) {
      task.assignedTo = assignedTo;
    }

    await task.save();
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
}

//Delete task
const deleteTaskById = async(req, res, next)=>{
const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).send('Task not found');
    }

    await example.remove();
    res.send('Example deleted successfully');
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports={
    createNewTask
}

module.exports={
    createNewTask
}
module.exports={
    getTaskById
}
module.exports={
    updateTaskById
}

module.exports={
    deleteTaskById
}

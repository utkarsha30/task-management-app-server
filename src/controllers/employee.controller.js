const employeeService = require("../services/employee.service");
const { Errors } = require("../constants");

const registerNewEmployee = async(req,res,next)=>{
    if (Object.keys(req.body).length === 0) {
        const error = new Error(
          `Request body is missing, and needs to to register new user`
        );
        error.name = Errors.BadRequest;
        return next(error);
      }
      try{
        const newEmployee = await employeeService.registerNewEmployee(req.body);
        res.status(201).json(newEmployee);

      }catch(error){
        return next(error);
      }
}
module.exports={
    registerNewEmployee
}

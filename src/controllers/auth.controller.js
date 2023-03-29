const employeeService = require("../services/employee.service");
const JWT = require("jsonwebtoken");
const { Errors } = require("../constants");

const registerNewEmployee = async(req,res,next)=>{
    if (Object.keys(req.body).length === 0) {
        const error = new Error(
          `Request body is missing, and needs to to register new employee`
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
const validateEmployee = async(req,res,next)=>{
    if (Object.keys(req.body).length === 0) {
        const error = new Error(
          `Request body is missing, and needs to have login details`
        );
        error.name = Errors.BadRequest;
        return next(error);
      }
      try{

        const employee = await employeeService.validateEmployee(req.body);
        if (!employee) {
          return res.status(400).json({
            status: "error",
            message: `Invalid credentials, `,
          });
        }
        //generate JWT
        const claims = {
          _id: employee._id,
          name: employee.name,
          email: employee.email,
        };
        JWT.sign(
          claims,
          process.env.JWT_SECRET,
          { expiresIn: "24h" },
          (err, token) => {
            if (err) {
              err.name = Errors.InternalServerError;
              return next(err);
            }
            res.json({
              id: employee._id,
              name: employee.name,
              email: employee.email,
              token,
            });
          }
        );
      }catch(error){
        const err = new Error("Something went wrong during login");
        err.name = Errors.InternalServerError;
        return next(err);
      }
}
module.exports={
    registerNewEmployee,
    validateEmployee
}

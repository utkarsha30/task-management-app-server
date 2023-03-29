const employeeService = require("../services/employee.service");
const { Errors } = require("../constants");
const findEmployee = async(req,res,next)=>{
    const loggedinUser = res.locals.claims;
    try{
        const match = await employeeService.getEmployeeDetails(loggedinUser._id);
        if (!match) {
            const error = new Error(`Employee with ${id} does not exist`);
            error.name = Errors.NotFound;
            return next(error);
          }
          res.json(match);

    }catch(error){
        next(error);
    }
}
module.exports={
    findEmployee
}
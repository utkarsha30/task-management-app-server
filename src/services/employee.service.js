const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Employee = mongoose.model("Employee");
const getEmployeeDetails = (id)=>{
    return Employee.findById({id},{password:0});
}
const registerNewEmployee = (details)=>{
    return Employee.create(details);
}
const validateEmployee = async(credentials)=>{
    const employee = await Employee.findOne({
        email: credentials.email
    });
    if (!employee) {
        return null;
      }
      const isMatch = await bcrypt.compare(
        credentials.password,
        employee.password
      );
    
      if (!isMatch) {
        return null;
      }
    
      return employee;

}
module.exports={
    registerNewEmployee,
    validateEmployee,
    getEmployeeDetails
}
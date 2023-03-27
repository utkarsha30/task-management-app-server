const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Employee = mongoose.model("Employee");
const registerNewEmployee = (details)=>{
    return Employee.create(details);
}
module.exports={
    registerNewEmployee
}
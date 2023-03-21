const mongoose = require("mongoose");
const employeesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "employee",
    enum: ["admin", "employee"],
  },
  managerId: {
    userId: String,
    email: String,
  },
});
const passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
employeesSchema.path("password").validate(function (value) {
  return passwordPat.test(value);
}, "Password must have at least 1 character , 1 digit, 1 special characters, and should be atleast 8 characters in length.");

mongoose.model("Employee", employeesSchema);

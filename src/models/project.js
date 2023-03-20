const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const projectsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
  status: {
    type: string,
    default: "active",
    enum: ["active", "completed"],
  },
  createdby: {
    type: ObjectId,
    ref: "Employee",
    required: true,
  },
  tasks: {
    type: ObjectId,
    ref: "Task",
    required: true,
  },
});
mongoose.model("Projects", projectsSchema);

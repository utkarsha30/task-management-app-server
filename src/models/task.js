const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const tasksSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "complete", "InProgress"],
  },
  assignedTo: {
    type: ObjectId,
    ref: "Employee",
    required: true,
  },
  project: {
    type: ObjectId,
    ref: "Project",
    required: true,
  },
  // createdBy: {
  //   type: ObjectID,
  //   ref: "Employee",
  //   required: true,
  // },
  //   createdAt : {
  //       type : Date,
  //       required: true,
  //   },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
});

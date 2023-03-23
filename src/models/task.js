const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const tasksSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  status: {
    type: string,
    default: "active",
    enum: ["active", "complete", "InProgress"],
  },
  assigneeId: {
    type: ObjectId,
    ref: "Employee",
    required: true,
  },
  projectId: {
    type: ObjectId,
    ref: "Project",
    required: true,
  },
  createdBy: {
    type: ObjectID,
    ref: "Employee",
    required: true,
  },
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

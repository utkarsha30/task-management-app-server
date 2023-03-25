const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const tasksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: string,
      default: "active",
      enum: ["active", "complete", "InProgress"],
    },
    assignedTo: {
      type: ObjectId,
      ref: "Employee",
    },
    projectId: {
      type: ObjectId,
      ref: "Project",
      required: true,
    },
    // createdBy: {
    //   type: ObjectId,
    //   ref: "Employee",
    //   required: true,
    // },
    // completed : {
    //   type : Boolean,
    //   default : false
    // }
    startdate: {
      type: Date,
      required: true,
    },
    enddate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("Task", tasksSchema);

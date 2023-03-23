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
    type: String,
    default: "active",
    enum: ["active", "complete"],
  },
  organizer: {
    type: ObjectId,
    ref: "Employee",
    required: true,
  },
  tasks: [
    {
      type: ObjectId,
      ref: "Task",
    },
  ],
  contributors: [
    {
      type: ObjectId,
      ref: "Employee",
    },
  ],
});

// projectsSchema.virtual("tasks", {
//   ref: "Task",
//   localField: "_id",
//   foreignField: "project",
// });

mongoose.model("Project", projectsSchema);

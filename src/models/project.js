const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const projectsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    creator: {
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
    collaborators: [
      {
        type: ObjectId,
        ref: "Employee",
      },
    ],
  },
  { timestamps: true }
);

mongoose.model("Project", projectsSchema);

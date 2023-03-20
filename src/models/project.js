const mongoose = require("mongoose");
const projectsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
});
mongoose.model("Projects", projectsSchema);
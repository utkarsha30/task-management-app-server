const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("../models/project");
// require("../models/meetings");
// require("../models/teams");
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
    // throw error;
  }
};
module.exports = {
  connect,
};

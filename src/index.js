require("dotenv/config");
const express = require("express");
// connecting to database
const { connect } = require("./db/init");
const app = express();
const PORT = process.env.PORT || 5001;
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1);
  });

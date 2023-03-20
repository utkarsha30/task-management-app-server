require("dotenv/config");
const express = require("express");
// connecting to database
const { connect } = require("./db/init");
const app = express();
app.get("/", (req, res) => {
    res.send(
      '<div style="width:200px; margin: auto auto;"><img width="100%"  src="https://media.tenor.com/2jd3xi2WVt0AAAAC/recurring-settings.gif"></div><div style="width:220px; margin: 0 auto;"><h2>Server is Running...</h2></div>'
    );
  });
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

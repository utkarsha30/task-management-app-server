require("dotenv/config");
const express = require("express");
const cors = require("cors");
// connecting to database
const { connect } = require("./db/init");
// create an application object
const app = express();
//to avoid cors policy error
app.use(cors({ origin: "*" }));
//for request body data
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    '<div style="width:200px; margin: auto auto;"><img width="100%"  src="https://media.tenor.com/2jd3xi2WVt0AAAAC/recurring-settings.gif"></div><div style="width:220px; margin: 0 auto;"><h2>Server is Running...</h2></div>'
  );
});

//routes
app.use("/api/employee", require("./routes/employee.route"));
app.use("/api/project", require("./routes/project.route"));
app.use("/api/task", require("./routes/task.route"));

app.use(require("./middleware/errors").resourceNotFound);
app.use(require("./middleware/errors").errorHandler);
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

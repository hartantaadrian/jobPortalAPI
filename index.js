const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
var mysqllib = require("./db/mysql");
const userRoutes = require("./router/user");
const jobRoutes = require("./router/job");

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  console.log(error);
  res.status(error.code || 500);
  res.json({ message: error.message || "An error occured on server!!" });
});
app.listen(5000);

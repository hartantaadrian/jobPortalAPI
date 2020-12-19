const HttpError = require("../models/http-error");
var sql = require("../db/mysql");

const insertToTable = (data) => {
  const values = {
    username: data.username,
    password: data.password,
  };
  sql.query("insert into user set ? ", values, (err, res) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

const logIn = async (req, res, next) => {
  const { username, password } = req.body;
  sql.query(
    "select * from user where username  = ? && password = ? ",
    [username, password],
    async (err, results) => {
      if (err) {
        console.log("error: ", err);
      } else {
        if (results.length > 0) {
          res.status(200).json({ status: "ok" });
        } else {
          await insertToTable(req.body);
          res.status(200).json({ status: "ok" });
        }
      }
    }
  );
};

exports.logIn = logIn;

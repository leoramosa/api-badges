const express = require("express");
const mysql = require("mysql");

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3306;

var app = express();

app.use(
  bodyParser.json(),

  function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  }
);

// MySql
const connection = mysql.createConnection({
  host: "ctgplw90pifdso61.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "jq1h63onppeuhqu2",
  password: "g0lklyl0wts6tkxx",
  database: "h2yy7oayk3hxmze3",
});

// Route
app.get("/", (req, res) => {
  res.send("Welcome to my API BADGES!");
});

// all customers
app.get("/badges", (req, res) => {
  const sql = "SELECT * FROM badges";

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("Not result");
    }
  });
});

app.get("/badges/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM badges WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("Not result");
    }
  });
});

app.post("/add", (req, res) => {
  const sql = "INSERT INTO badges SET ?";

  const badgesObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    jobTitle: req.body.jobTitle,
    twitter: req.body.twitter,
  };

  connection.query(sql, badgesObj, (error) => {
    if (error) throw error;
    res.send("Badges created!");
  });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, jobTitle, twitter } = req.body;
  const sql = `UPDATE badges SET firstName = '${firstName}', lastName='${lastName}', email='${email}', jobTitle='${jobTitle}', twitter='${twitter}' WHERE id =${id}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Badges updated!");
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM badges WHERE id= ${id}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Delete badges");
  });
});

// Check connect
connection.connect((error) => {
  if (error) throw error;
  console.log("Database server running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

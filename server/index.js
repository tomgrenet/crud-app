// Server: index.js
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "",
  user: "",
  password: "",
  database: "",
  port: "",
});

// Apply the middleware (don't think about it, just add it.)
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CREATE - Capture front-end entries and save it in the DB
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";

  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log("Error is:", err);
    console.log("Results is: ", result);
  });
});

//READ - Get the data from the DB
app.get("/api/select", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//DELETE
app.delete("/api/delete/:id", (req, res) => {
  const movieId = req.params.id;
  const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";

  db.query(sqlDelete, [movieId], (err, result) => {
    if (err) console.log(err);
    // console.log(result);
  });
});

//UPDATE
app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const review = req.body.movieReview;

  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?";

  db.query(sqlUpdate, [review, id], (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
});

//listening to the server
app.listen(3001, () => {
  console.log("running on port 3001");
});

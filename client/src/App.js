//Frontend: App.js
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  // CREATE API request
  // Called when the submit button is clicked on
  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    }).then(() => {
      // Code below so that the rendering of the list with the the READ request contains the new added film
      setMovieList([
        ...movieList,
        { movieName: movieName, movieReview: review },
      ]);
    });
  };

  // READ API request
  useEffect(() => {
    Axios.get("http://localhost:3001/api/select").then((response) => {
      setMovieList(response.data);
    });
  });

  //DELETE function
  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
  };

  //UPDATE function
  const updateReview = (id) => {
    Axios.put("http://localhost:3001/api/update", {
      id: id,
      movieReview: newReview,
    }).then(() => {
      setNewReview("");
    });
  };

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <div className="form">
        <label>Movie Name</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label>Review</label>
        <input
          type="text"
          name="movieReview"
          onChange={(e) => setReview(e.target.value)}
        />

        <button onClick={submitReview}>Submit</button>

        {movieList.map((val) => {
          return (
            // Rendering data in the DB
            <div className="card" key={val.id}>
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>
              {/* Deleting entries */}
              <button onClick={() => deleteReview(val.id)}>Delete</button>
              {/* For updating the review   */}
              <input
                type="text"
                id="updateInput"
                onChange={(e) => setNewReview(e.target.value)}
              />
              <button onClick={() => updateReview(val.id)}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header.js";
import Search from "./components/Search.js";
import Movie from "./components/Movie.js";
import "semantic-ui-css/semantic.min.css";

const BASE_URL = "http://www.omdbapi.com/?apikey=&s=";

function App() {
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(null);
    setLoading(false);
    if (movies.length === totalResults) {
      setErrorMessage("End of results");
      setLoading(false);
    }
  }, []);

  const clearMovies = () => {
    setMovies([]);
    setTotalResults(0);
  };

  const search = (input, page) => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`${BASE_URL}${input}&page=${page}`)
      .then(response => response.json())
      .then(resultJson => {
        if (resultJson.Response === "True") {
          setMovies([...movies, ...resultJson.Search]);
          setTotalResults(resultJson.totalResults);
        } else {
          setErrorMessage(resultJson.Error);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log("Unable to fetch data from OMDB.", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header title="Movie Search" />
      </header>
      <section>
        <Search search={search} clearMovies={clearMovies} />
      </section>
      <section>
        {movies.map((movie, index) => (
          <Movie key={`${index}-${movie.Title}`} movie={movie} />
        ))}
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : (
          <div className="errorMessage">{errorMessage}</div>
        )}
      </section>
    </div>
  );
}

export default App;

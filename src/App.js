import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header.js";
import Search from "./components/Search.js";
import Movie from "./components/Movie.js";
import "semantic-ui-css/semantic.min.css";

const BASE_URL = "http://www.omdbapi.com/?apikey=&s=";

function App() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [result, setResult] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (result === null) return;
    if (movies.length === result.totalResults) {
      setErrorMessage("End of results");
    } else {
      result.Response === "True"
        ? setMovies([...movies, ...result.Search])
        : setErrorMessage(result.Error);
      setLoading(false);
    }
  }, [result]);

  const clearMovies = () => {
    setMovies([]);
  };

  const search = (input, page) => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`${BASE_URL}${input}&page=${page}`)
      .then(response => response.json())
      .then(resultJson => {
        setResult(resultJson);
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

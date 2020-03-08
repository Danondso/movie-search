import React, { useState, useEffect } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import "./App.css";
import Header from "./components/Header.js";
import Search from "./components/Search.js";
import Movie from "./components/Movie.js";
import "semantic-ui-css/semantic.min.css";

const BASE_URL = "http://www.omdbapi.com/?apikey=ec16652&s=";
const DEFAULT_MOVIE_URL =
  "http://www.omdbapi.com/?apikey=ec16652&s=star&page=1";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(`${DEFAULT_MOVIE_URL}`)
      .then(response => response.json())
      .then(resultJson => {
        setMovies(resultJson.Search);
        setErrorMessage(null);
        setLoading(false);
      });
  }, []);

  const handleScrollToBottom = () => {
    setPage(page + 1);
    search("star", page);
  };

  useBottomScrollListener(handleScrollToBottom);

  const search = (input, page) => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`${BASE_URL}${input}&page=${page}`)
      .then(response => response.json())
      .then(resultJson => {
        if (resultJson.Response === "True") {
          setMovies([...movies, ...resultJson.Search]);
          setLoading(false);
        } else {
          setErrorMessage(resultJson.Error);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log("unable to fetch data from OMDB.", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header title="Movie Search" />
      </header>
      <section>
        <Search search={search} />
      </section>
      <section>
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </section>
    </div>
  );
}

export default App;

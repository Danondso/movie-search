import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header.js";
import Search from "./components/Search.js";
import Movie from "./components/Movie.js";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import "semantic-ui-css/semantic.min.css";

const BASE_URL = "http://www.omdbapi.com/?apikey=&s=";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
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

  useEffect(() => {
    clearMovies();
  }, [searchInput]);

  const clearMovies = () => {
    setPage(1);
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

  const handleUserInputChange = e => {
    if (e.target.value.length >= 3) {
      setSearchInput(e.target.value);
      search(e.target.value, page);
    } else {
      clearMovies();
    }
  };

  const handleScrollToBottom = () => {
    const updatePageCount = page + 1;
    // state update is async therefore you're not going to immediately be able to get the set value.
    setPage(updatePageCount);
    search(searchInput, updatePageCount);
  };

  useBottomScrollListener(handleScrollToBottom);

  return (
    <div className="App">
      <header className="App-header">
        <Header title="Movie Search" />
      </header>
      <section>
        <Search handleUserInputChange={handleUserInputChange} />
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

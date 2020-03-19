import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header.js";
import Search from "./components/Search.js";
import Movie from "./components/Movie.js";
import ClipLoader from "react-spinners/ClipLoader";
import Grid from "@material-ui/core/Grid";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import "semantic-ui-css/semantic.min.css";

const BASE_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=`;

function App() {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    resetResults();
  }, [searchInput]);

  const search = (input, page) => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`${BASE_URL}${input}&page=${page}`)
      .then(response => response.json())
      .then(resultJson => {
        if (resultJson.Response === "True") {
          setMovies([...movies, ...resultJson.Search]);
          if (movies.length === 0) setTotalResults(resultJson.totalResults);
          setLoading(false);
        } else {
          setErrorMessage(resultJson.Error);
          setLoading(false);
        }
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
      resetResults();
    }
  };

  const resetResults = () => {
    setPage(1);
    setMovies([]);
    setTotalResults(0);
    setErrorMessage("");
  };

  const handleScrollToBottom = () => {
    if (movies.length.toString() === totalResults) {
      setErrorMessage("End of results");
      return;
    }
    const updatePageCount = page + 1;
    // state update is async therefore you're not going to immediately be able to get the set value.
    setPage(updatePageCount);
    search(searchInput, updatePageCount);
  };

  useBottomScrollListener(handleScrollToBottom);

  return (
    <div className="App">
      <Header title="Movie Search" />
      <section className="input">
        <Search handleUserInputChange={handleUserInputChange} />
      </section>
      <section className="list">
        <Grid
          container
          direction="row"
          spacing={3}
          justify="center"
          alignItems="center"
        >
          {movies.map((movie, index) => (
            <Grid item xs={12} md={6} lg={4}>
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            </Grid>
          ))}
        </Grid>
      </section>
      <section className="padding-t-2">
        {loading && !errorMessage ? (
          <div className="padding-t-2">
            <ClipLoader size={50} color={"#282c34"} loading={true} />
          </div>
        ) : (
          <div className="padding-t-2">{errorMessage}</div>
        )}
      </section>
    </div>
  );
}

export default App;

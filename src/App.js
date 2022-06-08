import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Search from "./components/Search.js";
import Movie from "./components/Movie.js";
import ClipLoader from "react-spinners/ClipLoader";
import Grid from "@material-ui/core/Grid";
import MovieModal from "./components/MovieModal.js";

import { useBottomScrollListener } from "react-bottom-scroll-listener";
import "semantic-ui-css/semantic.min.css";

const BASE_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

function App() {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [movieDetail, setMovieDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    resetResults();
  }, [searchInput]);

  const search = (input, page) => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`${BASE_URL}&s=${input}&page=${page}`)
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

  const searchById = id => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`${BASE_URL}&i=${id}&plot=full`)
      .then(response => response.json())
      .then(resultJson => {
        if (resultJson.Response === "True") {
          setMovieDetail(resultJson);
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
      setSearchInput("");
      resetResults();
    }
  };

  const resetResults = () => {
    setPage(1);
    setMovies([]);
    setTotalResults(0);
    setErrorMessage("");
  };

  const handleOpen = id => {
    console.log(id);
    searchById(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScrollToBottom = () => {
    if (searchInput) {
      if (movies.length.toString() === totalResults) {
        setErrorMessage("End of results");
        return;
      }
      const updatePageCount = page + 1;
      setPage(updatePageCount);
      search(searchInput, updatePageCount);
    }
  };

  useBottomScrollListener(handleScrollToBottom);

  return (
    <div className="App">
      <Header title="Movie Search" />
      <section className="padding-b-2">
        <Search handleUserInputChange={handleUserInputChange} />
      </section>
      <section className="list">
        <Grid
          container
          direction="row"
          spacing={3}
          alignItems="center"
        >
          {movies.map((movie, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <button
                className="modal-button"
                onClick={() => handleOpen(movie.imdbID)}
              >
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              </button>
            </Grid>
          ))}
        </Grid>
      </section>
      <section>
        <MovieModal
          movieDetail={movieDetail}
          open={open}
          handleClose={handleClose}
        />
      </section>
      <section className="padding-t-2">
        {loading && !errorMessage ? (
          <div key='loading-div' className="padding-t-2">
            <ClipLoader size={50} color={"#282c34"} loading={true} />
          </div>
        ) : (
          <div key='loading-error-msg-div' className="padding-t-2">{errorMessage}</div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default App;

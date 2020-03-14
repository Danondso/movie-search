import React, { useState, useEffect } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import "./Search.css";

const Search = props => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    props.clearMovies();
  }, [searchInput]);

  const handleUserInputChange = e => {
    if (e.target.value.length >= 3) {
      e.target.value.replace("", "%20");
      setSearchInput(e.target.value);
      props.search(e.target.value, page);
    } else {
      props.clearMovies();
    }
  };

  const handleScrollToBottom = () => {
    const updatePageCount = page + 1;
    // state update is async therefore you're not going to immediately be able to get the set value.
    setPage(updatePageCount);
    props.search(searchInput, updatePageCount);
  };

  useBottomScrollListener(handleScrollToBottom);

  return (
    <div className="search-input">
      <input
        placeholder="movie-search..."
        onChange={handleUserInputChange}
      ></input>
    </div>
  );
};

export default Search;

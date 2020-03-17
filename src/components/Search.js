import React from "react";
import "./Search.css";

const Search = ({ handleUserInputChange }) => {
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

import React, { useState } from "react";
import "./Search.css";

const Search = props => {
  const [searchInput, setSearchInput] = useState("");

  const handleUserInputChange = e => {
    if (e.target.value.length >= 3) {
      setSearchInput(e.target.value);
      console.log(searchInput);
      e.target.value.replace("", "%20");
      props.search(e.target.value);
    }
  };

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

import React, { useState } from "react";

const Search = props => {
  const [searchInput, setSearchInput] = useState("");

  const handleUserInputChange = e => {
    if (e.target.value.length >= 3) {
      setSearchInput(e.target.value);
      console.log(searchInput);
      props.search(e.target.value);
    }
  };

  return (
    <input
      placeholder="movie-search..."
      onChange={handleUserInputChange}
    ></input>
  );
};

export default Search;

import React, { useState } from "react";

const Search = props => {
  const [searchInput, setSearchValue] = useState("");

  const handleUserInputChange = e => {
    console.log(e.target.value);
    if (e.target.value.length >= 3) {
      setSearchValue(e.target.value);
      props.search(searchInput);
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

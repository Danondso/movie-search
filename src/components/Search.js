import React, { useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import "./Search.css";

const Search = props => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const handleUserInputChange = e => {
    if (e.target.value.length >= 3) {
      if (searchInput !== e.target.value) {
        console.log('clearing movies');
        setPage(1);
        props.clearMovies();
      }
      setSearchInput(e.target.value);
      console.log(searchInput);
      e.target.value.replace("", "%20");
      props.search(e.target.value, page);
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

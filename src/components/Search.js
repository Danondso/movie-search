import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  "search-input": {
    paddingTop: "1rem"
  }
}));

const Search = ({ handleUserInputChange }) => {
  const classes = useStyles();
  return (
    <div className={classes["search-input"]}>
      <input
        placeholder="movie-search..."
        onChange={handleUserInputChange}
      ></input>
    </div>
  );
};

export default Search;

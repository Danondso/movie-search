import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const useStyles = makeStyles(theme => ({
  movie: {
    height: "auto",
    maxHeight: "400px",
    width: "auto",
    maxWidth: "250px",
    padding: "1rem"
  },
  title: {
    maxWidth: "20rem",
    padding: "1rem",
    fontSize: "1.95rem"
  }
}));

const Movie = ({ movie }) => {
  const classes = useStyles();
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <Card>
      <CardContent>
        <img alt={movie.Title} src={poster} className={classes.movie}></img>
        <div key={movie.Title} className={classes.title}>{movie.Title}</div>
      </CardContent>
    </Card>
  );
};

export default Movie;

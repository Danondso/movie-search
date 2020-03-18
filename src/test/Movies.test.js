import React from "react";
import Movie from "../components/Movie";
import renderer from "react-test-renderer";

const movieResult = {
  Title: "A fake movie",
  Year: "1983",
  imdbID: "imdbId",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
};

const movieResultNoResult = {
  Title: "Star Wars: Episode XX - Return of the Franchise",
  Year: "1983",
  imdbID: "imdbId",
  Type: "movie",
  Poster: "N/A"
};

test("Movie renders with passed in data", () => {
  const component = renderer.create(<Movie movie={movieResult} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Movie without poster renders", () => {
  const component = renderer.create(<Movie movie={movieResultNoResult} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

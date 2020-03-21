import React from "react";
import Movie from "../components/Movie";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

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
  const component = shallow(<Movie movie={movieResult} />);
  let tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test("Movie without poster renders", () => {
  const component = shallow(<Movie movie={movieResultNoResult} />);
  let tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

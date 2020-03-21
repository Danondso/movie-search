import React from "react";
import MovieModal from "../components/MovieModal";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

const movieDetails = {
  Title: "Star Wars: Episode IV - A New Hope",
  Year: "1977",
  Rated: "PG",
  Released: "25 May 1977",
  Runtime: "121 min",
  Genre: "Action, Adventure, Fantasy, Sci-Fi",
  Director: "George Lucas",
  Writer: "George Lucas",
  Actors: "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
  Plot:
    "The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.",
  Language: "English",
  Country: "USA",
  Awards: "Won 6 Oscars. Another 52 wins & 28 nominations.",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "8.6/10"
    },
    {
      Source: "Rotten Tomatoes",
      Value: "92%"
    },
    {
      Source: "Metacritic",
      Value: "90/100"
    }
  ],
  Metascore: "90",
  imdbRating: "8.6",
  imdbVotes: "1,175,323",
  imdbID: "tt0076759",
  Type: "movie",
  DVD: "21 Sep 2004",
  BoxOffice: "N/A",
  Production: "20th Century Fox",
  Website: "N/A",
  Response: "True"
};

const movieResultNoResult = {
  Title: "Star Wars: Episode IV - A New Hope",
  Year: "1977",
  Rated: "PG",
  Released: "25 May 1977",
  Runtime: "121 min",
  Genre: "Action, Adventure, Fantasy, Sci-Fi",
  Director: "George Lucas",
  Writer: "George Lucas",
  Actors: "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
  Plot:
    "The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.",
  Language: "English",
  Country: "USA",
  Awards: "Won 6 Oscars. Another 52 wins & 28 nominations.",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "8.6/10"
    },
    {
      Source: "Rotten Tomatoes",
      Value: "92%"
    },
    {
      Source: "Metacritic",
      Value: "90/100"
    }
  ],
  Metascore: "90",
  imdbRating: "8.6",
  imdbVotes: "1,175,323",
  imdbID: "tt0076759",
  Type: "movie",
  DVD: "21 Sep 2004",
  BoxOffice: "N/A",
  Production: "20th Century Fox",
  Website: "N/A",
  Response: "True"
};

test("Movie renders with passed in data", () => {
  const component = shallow(
    <MovieModal movieDetail={movieDetails} open={true} handleClose={() => {}} />
  );
  let tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test("Movie without poster renders", () => {
  const component = shallow(
    <MovieModal
      movieDetail={movieResultNoResult}
      open={true}
      handleClose={() => {}}
    />
  );
  let tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

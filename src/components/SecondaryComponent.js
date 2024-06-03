import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryComponent = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies && (
      <div className="bg-black">
        <div className="pl-4 md:pl-12 mt-0 md:-mt-52 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"UP Coming"} movies={movies.upComingMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryComponent;

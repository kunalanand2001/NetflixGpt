import { useDispatch } from "react-redux";
import { addUpComingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { TMDB_URL_OPTIONS } from "../utils/tmdbOptions";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      TMDB_URL_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpComingMovies(json.results));
  };

  useEffect(() => {
    getUpcomingMovies();
  });
};

export default useUpcomingMovies;

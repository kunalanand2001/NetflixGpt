import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TMDB_URL_OPTIONS } from "../utils/tmdbOptions";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      TMDB_URL_OPTIONS
    );
    const json = await data.json();

    const trailers = json.results.filter((video) => video.type === "Trailer");

    const bgVideo = trailers.length ? trailers[0] : json.results[0];

    dispatch(addTrailerVideo(bgVideo));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;

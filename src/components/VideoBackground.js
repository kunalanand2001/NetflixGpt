import React, { useEffect } from "react";
import { TMDB_URL_OPTIONS } from "../utils/tmdbOptions";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const bgTrailerVideo = useSelector(
    (store) => store.movies?.mainMovieTrailerVideo
  );

  useMovieTrailer(movieId);
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={"https://www.youtube.com/embed/" + bgTrailerVideo?.key}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;

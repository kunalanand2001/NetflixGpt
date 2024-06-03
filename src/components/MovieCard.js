import React from "react";
import { MOVIE_POSTER_IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img alt="movie poster" src={MOVIE_POSTER_IMG_CDN + posterPath} />
    </div>
  );
};

export default MovieCard;

import React from "react";
import { MOVIE_POSTER_IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-4">
      <img alt="movie poster" src={MOVIE_POSTER_IMG_CDN + posterPath} />
    </div>
  );
};

export default MovieCard;
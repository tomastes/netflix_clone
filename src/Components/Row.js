import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
const Row = ({ isLargeRow = false, title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      //  console.log(request.data.results);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies?.map((movie) => (
          //
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && `row_posterLarge`}`}
            src={`https://image.tmdb.org/t/p/original/${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default Row;

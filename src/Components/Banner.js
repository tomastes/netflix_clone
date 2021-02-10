import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./Request";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "...." : string;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        opacity: 2,
      }}
    >
      <div className="banner_contents">
        <h1 className="banner__title">{movie?.name}</h1>
        <div className="banner__buttons">
          <button className="banner_btn"> Play</button>
          <button className="banner_btn">my List</button>
        </div>
        <h1 className="banner_desc">{truncate(`${movie?.overview}`, 140)}</h1>
      </div>
      <div className="banner--fadeBottm" />
    </header>
  );
};

export default Banner;

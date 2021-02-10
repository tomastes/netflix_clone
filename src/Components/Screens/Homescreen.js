import React from "react";
import Banner from "../Banner";
import Nav from "../Nav";
import requests from "../Request";
import Row from "../Row";
import "./Homescreen.css";

const Homescreen = () => {
  return (
    <div
      className="homeScreen"
      style={{
        backgroundColor: "#111",
      }}
    >
      {/* net flix navigation */}
      <Nav />
      <Banner />
      {/* Banner */}

      {/* Row */}
      <Row
        title="NETFLEX ORGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending" fetchUrl={requests.fetchDocumentaries} />

      <Row title="TOP RATED" fetchUrl={requests.fetchTopRated} />
      <Row title="ACTION MOVIES" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentray Films" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
};

export default Homescreen;

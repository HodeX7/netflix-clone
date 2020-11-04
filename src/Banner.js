import React, { useState, useEffect } from "react";
import instance from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [show, setShow] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchNetflixOriginals);
      setShow(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${show?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {show?.title || show?.name || show?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Watch Now</button>
          <button className="banner__button">WishList +</button>
        </div>
        <h1 className="banner__description">{truncate(show?.overview, 190)}</h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;

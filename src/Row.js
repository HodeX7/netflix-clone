import React, { useState, useEffect } from "react";
import instance from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [shows, setShows] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchURL);
      setShows(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (show) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(show?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); // to get the video id from the url
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {shows.map((show) => (
            <img
              key={show.id}
              onClick={() => handleClick(show)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? show.poster_path : show.backdrop_path
              }`}
              alt={show.name}
            />
          ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;

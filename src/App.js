import Row from "./Row";
import "./App.css";
import requests from "./requests";
import Banner from "./Banner";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        isLargeRow={true}
        fetchURL={requests.fetchNetflixOriginals}
      />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romantic Movies" fetchURL={requests.fetchRomanticMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;

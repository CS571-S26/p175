import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import BrowseMovies from "./pages/BrowseMovies";
import MyWatchlist from "./pages/MyWatchlist";
import WatchedMovies from "./pages/WatchedMovies";
import MovieDetails from "./components/MovieDetails";
import NavBar from "./components/NavBar";

function App() {
  // load from sessionStorage if exists
  const [watchlist, setWatchlist] = useState(
    JSON.parse(sessionStorage.getItem("watchlist")) || []
  );

  const [watched, setWatched] = useState(
    JSON.parse(sessionStorage.getItem("watched")) || []
  );

  const [search, setSearch] = useState("");

  return (
    <Router>
      <div>
        <NavBar
          watchlistCount={watchlist.length}
          watchedCount={watched.length}
        />

        <Routes>
          {/* browse page */}
          <Route
            path="/"
            element={
              <BrowseMovies
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                search={search}
                setSearch={setSearch}
              />
            }
          />

          {/* watchlist page */}
          <Route
            path="/watchlist"
            element={
              <MyWatchlist
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                watched={watched}
                setWatched={setWatched}
              />
            }
          />

          {/* watched page */}
          <Route
            path="/watched"
            element={<WatchedMovies watched={watched} />}
          />

          {/* movie details page */}
          <Route
            path="/movie/:imdbID"
            element={
              <MovieDetails
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                watched={watched}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
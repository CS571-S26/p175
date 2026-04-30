import { useState } from "react";
import { Container, Row, Col, Toast } from "react-bootstrap";
import data from "../data/movies.json";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import PageHeader from "../components/PageHeader";

function BrowseMovies({ watchlist, setWatchlist, search, setSearch }) {
  const movies = data.movies;
  const [showToast, setShowToast] = useState(false);

  const handleAdd = (movie) => {
    if (watchlist.some((m) => m.Title === movie.Title)) {
      return;
    }

    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    //save in sessionstorage
    sessionStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

    // little confirmation popup
    setShowToast(true);
  };

  const filtered = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="pt-5">
      <PageHeader
        title="Browse Movies"
        subtitle="Search and save movies to your personal watchlist"
      />

      <SearchBar search={search} setSearch={setSearch} />

      <Row>
        {filtered.slice(0, 24).map((movie, idx) => {
          const isAdded = watchlist.some((m) => m.Title === movie.Title);

          return (
            <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <MovieCard
                movie={movie}
                buttonText={isAdded ? "Added" : "Add to Watchlist"}
                buttonVariant={isAdded ? "secondary" : "primary"}
                disabled={isAdded}
                onButtonClick={() => handleAdd(movie)}
              />
            </Col>
          );
        })}
      </Row>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2000}
        autohide
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#1e1e1e",
          color: "white",
          border: "1px solid #333",
          zIndex: 9999
        }}
      >
        <Toast.Body>Movie added to watchlist!</Toast.Body>
      </Toast>
    </Container>
  );
}

export default BrowseMovies;
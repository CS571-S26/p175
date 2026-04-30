import { useState } from "react";
import { Container, Row, Col, Toast, Button, Form } from "react-bootstrap";
import data from "../data/movies.json";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import PageHeader from "../components/PageHeader";

function BrowseMovies({ watchlist, setWatchlist, watched, search, setSearch }) {
  const movies = data.movies;
  const [showToast, setShowToast] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");

  const moviesPerPage = 24;

  const handleAdd = (movie) => {
    if (
      watchlist.some((m) => m.imdbID === movie.imdbID) ||
      watched.some((m) => m.imdbID === movie.imdbID)
    ) {
      return;
    }

    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    //save in sessionstorage
    sessionStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

    setShowToast(true);
  };

  let filtered = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy === "alphabetical") {
    filtered = [...filtered].sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortBy === "newest") {
    filtered = [...filtered].sort((a, b) => Number(b.Year) - Number(a.Year));
  } else if (sortBy === "oldest") {
    filtered = [...filtered].sort((a, b) => Number(a.Year) - Number(b.Year));
  } else if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => Number(b.imdbRating) - Number(a.imdbRating));
  }

  const totalPages = Math.ceil(filtered.length / moviesPerPage);
  const startIndex = (page - 1) * moviesPerPage;
  const currentMovies = filtered.slice(startIndex, startIndex + moviesPerPage);

  const changePage = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  return (
    <Container className="pt-5">
      <PageHeader
        title="Browse Movies"
        subtitle="Search, sort, and save movies to your personal watchlist"
      />

      <SearchBar
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <Form.Group className="mb-4" controlId="sort-movies">
        <Form.Label style={{ color: "white" }}>Sort movies by</Form.Label>
        <Form.Select
          value={sortBy}
          onChange={handleSortChange}
          style={{
            backgroundColor: "#1e1e1e",
            color: "white",
            border: "1px solid #333",
            borderRadius: "10px",
            padding: "12px",
            maxWidth: "300px"
          }}
        >
          <option value="default">Default order</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="newest">Newest released</option>
          <option value="oldest">Oldest released</option>
          <option value="rating">Highest IMDb rating</option>
        </Form.Select>
      </Form.Group>

      <Row>
        {currentMovies.map((movie, idx) => {
          const isAdded = watchlist.some((m) => m.imdbID === movie.imdbID);
          const isWatched = watched.some((m) => m.imdbID === movie.imdbID);

          return (
            <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <MovieCard
                movie={movie}
                buttonText={
                  isWatched ? "Watched" : isAdded ? "Added" : "Add to Watchlist"
                }
                buttonVariant={isWatched || isAdded ? "secondary" : "primary"}
                disabled={isWatched || isAdded}
                onButtonClick={() => handleAdd(movie)}
              />
            </Col>
          );
        })}
      </Row>

      <div
        className="d-flex justify-content-center align-items-center my-4"
        style={{ gap: "8px" }}
      >
        <Button disabled={page === 1} onClick={() => changePage(page - 1)}>
          &lt;
        </Button>

        {[...Array(totalPages)].slice(0, 6).map((_, idx) => {
          const pageNum = idx + 1;

          return (
            <Button
              key={pageNum}
              onClick={() => changePage(pageNum)}
              style={{
                backgroundColor: page === pageNum ? "#f5c518" : "#333",
                color: page === pageNum ? "black" : "white",
                border: "1px solid #555",
                fontWeight: "600"
              }}
            >
              {pageNum}
            </Button>
          );
        })}

        {totalPages > 6 && <span style={{ color: "#aaa" }}>...</span>}

        <Button disabled={page === totalPages} onClick={() => changePage(page + 1)}>
          &gt;
        </Button>
      </div>

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
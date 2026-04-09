import { Container, Row, Col, Form } from "react-bootstrap";
import data from "../data/movies.json";
import MovieCard from "../components/MovieCard";

function BrowseMovies({ watchlist, setWatchlist, search, setSearch }) {
  const movies = data.movies;

  const handleAdd = (movie) => {
    if (watchlist.some((m) => m.Title === movie.Title)) {
      return;
    }

    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    //save in sessionstorage
    sessionStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const filtered = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h1 className="mb-3">Browse Movies</h1>

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search movies by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

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
    </Container>
  );
}

export default BrowseMovies;
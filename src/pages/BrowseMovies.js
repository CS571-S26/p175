import { Container, Row, Col } from "react-bootstrap";
import data from "../data/movies.json";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import PageHeader from "../components/PageHeader";

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
    </Container>
  );
}

export default BrowseMovies;
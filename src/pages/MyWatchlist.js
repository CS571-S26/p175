import { Container, Row, Col, Button } from "react-bootstrap";
import MovieCard from "../components/MovieCard";

function MyWatchlist({ watchlist, setWatchlist, watched, setWatched }) {

  const handleRemove = (movieToRemove) => {
    //removing movie from watchlist
    const updatedWatchlist = watchlist.filter((movie) => movie.Title !== movieToRemove.Title);
    //console.log("removing:", movieToRemove.Title);
    setWatchlist(updatedWatchlist);
    sessionStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };
  const handleWatched = (movieToWatch) => {
    //move movie from watchlist to watched
    const updatedWatchlist = watchlist.filter((movie) => movie.Title !== movieToWatch.Title);
    const updatedWatched = [...watched, movieToWatch];
    //console.log("marking:", movieToWatch.Title);
    //console.log(updatedWatched);

    setWatchlist(updatedWatchlist);
    setWatched(updatedWatched);
    sessionStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    sessionStorage.setItem("watched", JSON.stringify(updatedWatched));
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-3">My Watchlist</h1>
      <Row>
        {watchlist.length === 0 ? (
          <p>No movies in your watchlist yet.</p>
        ) : watchlist.map((movie, idx) => (
            <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
              {/* showing each movie in watchlist*/}
              <MovieCard
                movie={movie}
                buttonText="Remove"
                buttonVariant="danger"
                disabled={false}
                onButtonClick={() => handleRemove(movie)}
              />
              {/* mark as watched button */}
              <Button
                variant="success"
                className="mt-2"
                onClick={() => handleWatched(movie)}
              >
                Mark as Watched
              </Button>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default MyWatchlist;
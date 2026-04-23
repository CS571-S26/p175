import { Container, Row, Col, Button } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import PageHeader from "../components/PageHeader";

function MyWatchlist({ watchlist, setWatchlist, watched, setWatched }) {

  const handleRemove = (movieToRemove) => {
    //removing movie from watchlist
    const updatedWatchlist = watchlist.filter((movie) => movie.Title !== movieToRemove.Title);
    setWatchlist(updatedWatchlist);
    sessionStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const handleWatched = (movieToWatch) => {
    //move movie from watchlist to watched
    const updatedWatchlist = watchlist.filter((movie) => movie.Title !== movieToWatch.Title);
    const updatedWatched = [...watched, movieToWatch];

    setWatchlist(updatedWatchlist);
    setWatched(updatedWatched);

    sessionStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    sessionStorage.setItem("watched", JSON.stringify(updatedWatched));
  };

  return (
    <Container className="pt-5">

      {/* page header component */}
      <PageHeader
        title="My Watchlist"
        subtitle="Movies you plan to watch"
      />

      <Row>
        {watchlist.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "80px", color: "#aaa" }}>
            <h4 style={{ color: "white" }}>No movies yet...</h4>
            <p>Go add some from the Browse page</p>
          </div>
        ) : watchlist.map((movie, idx) => (
            <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">

              {/* showing each movie in watchlist */}
              <MovieCard
                movie={movie}
                buttonText="Remove"
                buttonVariant="danger"
                disabled={false}
                onButtonClick={() => handleRemove(movie)}
              />

              {/* mark as watched button */}
              <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                <Button
                  variant="success"
                  onClick={() => handleWatched(movie)}
                >
                  Mark as Watched
                </Button>
              </div>

            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default MyWatchlist;
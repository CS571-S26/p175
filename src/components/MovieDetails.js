import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Button, Toast } from "react-bootstrap";
import data from "../data/movies.json";
import PageHeader from "../components/PageHeader";
import RatingBadge from "../components/RatingBadge";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

function MovieDetails({ watchlist, setWatchlist, watched }) {
  const { imdbID } = useParams();
  const movie = data.movies.find((m) => m.imdbID === imdbID);

  const hasWatched = watched.some((m) => m.imdbID === imdbID);
  const isInWatchlist = watchlist.some((m) => m.imdbID === imdbID);

  const [showToast, setShowToast] = useState(false);

  const [reviews, setReviews] = useState(
    JSON.parse(sessionStorage.getItem(`reviews-${imdbID}`)) || []
  );

  if (!movie) {
    return (
      <Container className="pt-5">
        <PageHeader
          title="Movie Not Found"
          subtitle="Something went wrong finding this movie."
        />
        <Button as={Link} to="/" variant="warning">
          Back to Browse
        </Button>
      </Container>
    );
  }

  const handleAdd = () => {
    if (isInWatchlist) {
      return;
    }

    const updatedWatchlist = [...watchlist, movie];

    setWatchlist(updatedWatchlist);
    sessionStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

    // little confirmation popup
    setShowToast(true);
  };

  return (
    <Container className="pt-5">
      <PageHeader
        title={movie.Title}
        subtitle={`${movie.Year} • ${movie.Runtime} • ${movie.Genre}`}
      />

      <Row>
        <Col xs={12} md={4} className="mb-4">
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            style={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.5)"
            }}
          />
        </Col>

        <Col xs={12} md={8}>
          <h2 style={{ color: "white" }}>About this movie</h2>

          <p style={{ color: "#ccc", fontSize: "1.05rem" }}>
            {movie.Plot}
          </p>

          <div className="mb-3">
            <RatingBadge label="IMDb" value={movie.imdbRating} />
            <RatingBadge label="Metascore" value={movie.Metascore} />
            <RatingBadge label="Rated" value={movie.Rated} />
          </div>

          <p style={{ color: "#ccc" }}>
            <strong style={{ color: "white" }}>Director:</strong>{" "}
            {movie.Director}
          </p>

          <p style={{ color: "#ccc" }}>
            <strong style={{ color: "white" }}>Actors:</strong>{" "}
            {movie.Actors}
          </p>

          <p style={{ color: "#ccc" }}>
            <strong style={{ color: "white" }}>Awards:</strong>{" "}
            {movie.Awards}
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "10px"
            }}
          >
            <Button
              onClick={handleAdd}
              disabled={isInWatchlist}
              style={{
                backgroundColor: "#f5c518",
                color: "black",
                border: "none",
                fontWeight: "600",
                opacity: isInWatchlist ? 0.6 : 1
              }}
            >
              {isInWatchlist ? "Already in Watchlist" : "Add to Watchlist"}
            </Button>

            <Button
              as={Link}
              to="/"
              style={{
                backgroundColor: "#333",
                color: "white",
                border: "1px solid #555",
                fontWeight: "600"
              }}
            >
              Back to Browse
            </Button>
          </div>
        </Col>
      </Row>

      {/* only let users review movies they marked as watched */}
      {hasWatched ? (
        <ReviewForm
          movieId={imdbID}
          reviews={reviews}
          setReviews={setReviews}
        />
      ) : (
        <div
          style={{
            backgroundColor: "#1e1e1e",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "18px",
            marginTop: "25px",
            color: "#ccc"
          }}
        >
          <h2 style={{ color: "white", fontSize: "1.4rem" }}>
            Add Your Review
          </h2>
          <p style={{ marginBottom: 0 }}>
            Mark this movie as watched before leaving a review.
          </p>
        </div>
      )}

      <ReviewList reviews={reviews} />

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

export default MovieDetails;
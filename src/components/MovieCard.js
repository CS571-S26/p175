import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, buttonText, buttonVariant, onButtonClick, disabled }) {
  const [posterPath, setPosterPath] = useState("");

  useEffect(() => {
    const getPoster = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${encodeURIComponent(movie.Title)}`
        );

        const data = await res.json();

        if (data.results && data.results.length > 0) {
          setPosterPath(data.results[0].poster_path);
        }
      } catch (err) {
        console.log("poster error", err);
      }
    };

    getPoster();
  }, [movie.Title]);

  const posterSrc = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : movie.Poster || "https://placehold.co/300x450?text=No+Poster";

  return (
    <Card
      style={{
        height: "100%",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.5)",
        backgroundColor: "#1e1e1e",
        color: "white",
        transition: "transform 0.2s",
        overflow: "hidden"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Card.Img
        variant="top"
        src={posterSrc}
        alt={`${movie.Title} poster`}
        style={{
          height: "420px",
          objectFit: "cover"
        }}
      />

      <Card.Body>
        <Card.Title style={{ fontSize: "1.1rem", fontWeight: "600" }}>
          {movie.Title}
        </Card.Title>

        <Card.Subtitle className="mb-2" style={{ color: "#aaa" }}>
          {movie.Year}
        </Card.Subtitle>

        <Card.Text style={{ fontSize: "0.9rem" }}>
          <strong>Genre:</strong> {movie.Genre}
        </Card.Text>

        <Card.Text style={{ fontSize: "0.9rem", color: "#ccc" }}>
          <strong>Runtime:</strong> {movie.Runtime}
        </Card.Text>

        <Button
          as={Link}
          to={`/movie/${movie.imdbID}`}
          style={{
            width: "100%",
            borderRadius: "8px",
            fontWeight: "600",
            marginTop: "8px",
            backgroundColor: "#333",
            border: "1px solid #555",
            color: "white"
          }}
        >
          View Details
        </Button>

        <Button
          onClick={onButtonClick}
          disabled={disabled}
          style={{
            width: "100%",
            borderRadius: "8px",
            fontWeight: "600",
            marginTop: "8px",
            backgroundColor: "#f5c518",
            border: "none",
            color: "black",
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? "not-allowed" : "pointer"
          }}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
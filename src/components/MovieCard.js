import { Card, Button } from "react-bootstrap";

function MovieCard({ movie, buttonText, buttonVariant, onButtonClick, disabled }) {
  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {movie.Year}
        </Card.Subtitle>
        <Card.Text>
          <strong>Genre:</strong> {movie.Genre}
        </Card.Text>
        <Card.Text>
          <strong>Runtime:</strong> {movie.Runtime}
        </Card.Text>
        <Card.Text>
          <strong>Rated:</strong> {movie.Rated}
        </Card.Text>
        <Button
          variant={buttonVariant}
          disabled={disabled}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
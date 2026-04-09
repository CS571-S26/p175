import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";

function WatchedMovies({ watched }) {
  return (
    <Container className="mt-4">
      <h1 className="mb-3">Watched Movies</h1>
      <Row>
        {watched.length===0 ? (
          <p>No watched movies yet.</p>
        ) : (
          watched.map((movie, idx) => (
            <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <MovieCard
                movie={movie}
                buttonText="Watched"
                buttonVariant="secondary"
                disabled={true}
                onButtonClick={() => {}}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default WatchedMovies;
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";

function WatchedMovies({ watched }) {
  return (
    <Container className="mt-4">
      <div className="mb-4">
        <h1 style={{ color: "white", fontWeight: "700" }}>
          Watched Movies
        </h1>
        <p style={{ color: "#aaa", marginTop: "-6px" }}>
          Movies you've already watched
        </p>
      </div>
      <Row>
        {watched.length===0 ? (
          <div style={{ textAlign: "center", marginTop: "80px", color: "#aaa" }}>
            <h4 style={{ color: "white" }}>No watched movies yet!</h4>
            <p>Movies you mark as watched will show up here</p>
          </div>
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
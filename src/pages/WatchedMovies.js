import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import PageHeader from "../components/PageHeader";

function WatchedMovies({ watched }) {
  return (
    <Container className="pt-5">
      <PageHeader
        title="Watched Movies"
        subtitle="Movies you've already watched"
      />

      <Row>
        {watched.length === 0 ? (
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
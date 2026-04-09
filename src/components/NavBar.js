import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar({ watchlistCount, watchedCount }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My Movie Watchlist
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Browse Movies
          </Nav.Link>
          {/*add how many in watchlist*/}
          <Nav.Link as={Link} to="/watchlist">
            My Watchlist ({watchlistCount})
          </Nav.Link>
          {/*add how many watched movies*/}
          <Nav.Link as={Link} to="/watched">
            Watched Movies ({watchedCount})
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
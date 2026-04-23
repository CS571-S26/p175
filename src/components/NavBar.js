import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar({ watchlistCount, watchedCount }) {
  return (
    <Navbar
      style={{
        backgroundColor: "#0d0d0d",
        borderBottom: "1px solid #222"
      }}
      variant="dark"
      expand="lg"
    >
      <Container>
       <Navbar.Brand
        as={Link}
        to="/"
        style={{
          fontWeight: "700",
          fontSize: "1.8rem",
          letterSpacing: "1px",
          color: "#f5c518"
        }}
      >
        NextUp
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
import { Form } from "react-bootstrap";

function SearchBar({ search, setSearch }) {
  return (
    <Form className="mb-4">
      <Form.Label htmlFor="movie-search" visuallyHidden>
        Search movies by title
      </Form.Label>

      <Form.Control
        id="movie-search"
        type="text"
        placeholder="Search movies by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          backgroundColor: "#1e1e1e",
          color: "white",
          border: "1px solid #333",
          borderRadius: "10px",
          padding: "12px"
        }}
      />
    </Form>
  );
}

export default SearchBar;
import { Form } from "react-bootstrap";

function SearchBar({ search, setSearch }) {
  return (
    <Form className="mb-4">
      <Form.Control
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
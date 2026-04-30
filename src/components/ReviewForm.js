import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function ReviewForm({ movieId, reviews, setReviews }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      alert("Please write a review before submitting.");
      return;
    }

    const newReview = {
      name: name,
      rating: rating,
      text: text
    };

    const updatedReviews = [...reviews, newReview];

    // saving reviews by movie id
    setReviews(updatedReviews);
    sessionStorage.setItem(`reviews-${movieId}`, JSON.stringify(updatedReviews));

    // reset form
    setName("");
    setRating("5");
    setText("");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#1e1e1e",
        border: "1px solid #333",
        borderRadius: "12px",
        padding: "18px",
        marginTop: "25px"
      }}
    >
      <h2 style={{ color: "white", fontSize: "1.4rem" }}>
        Add Your Review
      </h2>

      <Form.Group className="mb-3" controlId="review-name">
        <Form.Label style={{ color: "white" }}>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ backgroundColor: "#121212", color: "white", border: "1px solid #444" }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="review-rating">
        <Form.Label style={{ color: "white" }}>Rating</Form.Label>
        <Form.Select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ backgroundColor: "#121212", color: "white", border: "1px solid #444" }}
        >
          <option value="5">5 - Loved it</option>
          <option value="4">4 - Pretty good</option>
          <option value="3">3 - Okay</option>
          <option value="2">2 - Not great</option>
          <option value="1">1 - Bad</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="review-text">
        <Form.Label style={{ color: "white" }}>Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Write what you thought about the movie..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ backgroundColor: "#121212", color: "white", border: "1px solid #444" }}
        />
      </Form.Group>

      <Button
        type="submit"
        style={{
          backgroundColor: "#f5c518",
          border: "none",
          color: "black",
          fontWeight: "600"
        }}
      >
        Submit Review
      </Button>
    </Form>
  );
}

export default ReviewForm;
function ReviewCard({ review }) {
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "14px",
        marginBottom: "12px",
        color: "white"
      }}
    >
      <h3 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>
        {review.name || "Anonymous"}
      </h3>

      <p style={{ color: "#f5c518", marginBottom: "6px" }}>
        Rating: {review.rating}/5
      </p>

      <p style={{ color: "#ccc", marginBottom: 0 }}>
        {review.text}
      </p>
    </div>
  );
}

export default ReviewCard;
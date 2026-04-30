function RatingBadge({ label, value }) {
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "10px 14px",
        color: "white",
        marginRight: "10px",
        marginBottom: "10px",
        display: "inline-block"
      }}
    >
      <strong style={{ color: "#f5c518" }}>{label}: </strong>
      {value || "N/A"}
    </div>
  );
}

export default RatingBadge;
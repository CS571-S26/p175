import ReviewCard from "./ReviewCard";

function ReviewList({ reviews }) {
  return (
    <div>
      <h2 style={{ color: "white", marginTop: "30px" }}>
        User Reviews
      </h2>

      {reviews.length === 0 ? (
        <p style={{ color: "#aaa" }}>
          No reviews yet. Be the first to add one.
        </p>
      ) : (
        reviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))
      )}
    </div>
  );
}

export default ReviewList;
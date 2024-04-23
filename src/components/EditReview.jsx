import { useState } from "react";

const EditReview = ({ review, setEditMode, setMessage, forceUpdate }) => {
  const [inputTitle, setTitle] = useState(review.title);
  const [inputBody, setBody] = useState(review.content);
  const [inputRating, setRating] = useState(review.rating);
  const [error, setError] = useState("");
  const URL = "http://localhost:3000/api";

  function handleSubmit(e) {
    e.preventDefault();

    async function updateReview() {
      try {
        const res = await fetch(`${URL}/reviews/${review._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: inputTitle,
            content: inputBody,
            rating: inputRating,
          }),
        });
        const { message } = await res.json();
        setMessage(message);
        forceUpdate();
        setEditMode((mode) => !mode);
      } catch (error) {
        setError(
          "Something went wrong with editing the review. Please try again."
        );
        return;
      }
    }
    updateReview();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="review-title">TITLE:</label>
      <input
        type="text"
        id="review-title"
        placeholder="Title"
        value={inputTitle}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <label htmlFor="review-body">YOUR REVIEW:</label>
      <textarea
        type="text"
        id="review-body"
        placeholder="Write your review..."
        value={inputBody}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <label htmlFor="review-rating">FOOD RATING:</label>
      <select
        id="review-rating"
        value={inputRating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button onClick={() => setEditMode((mode) => !mode)}>
        EXIT EDITING MODE
      </button>
      <input type="submit" value="SUBMIT REVIEW" />
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default EditReview;

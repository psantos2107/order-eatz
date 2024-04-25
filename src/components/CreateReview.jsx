import { useState } from "react";

const CreateReview = ({ id, setMessage, forceUpdate }) => {
  const [inputTitle, setTitle] = useState("");
  const [inputBody, setBody] = useState("");
  const [inputRating, setRating] = useState("4");
  const [error, setError] = useState("");
  const foodID = id;
  const URL = "http://localhost:3000/api";

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('userToken'); // Retrieve the token from local storage

    if (!token) {
      setError("You must be logged in to submit a review.");
      return;
    }

    async function postReview() {
      try {
        const res = await fetch(`${URL}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
          },
          body: JSON.stringify({
            title: inputTitle,
            content: inputBody,
            rating: inputRating,
            foodItem: foodID,
          }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Unable to submit the review.");
        }
        const postedReview = await res.json();
        setTitle("");
        setBody("");
        setRating("4");
        setMessage(postedReview.message || "Review submitted successfully!");
        forceUpdate();
      } catch (error) {
        console.error(error);
        setError("Something went wrong with submitting the review. Please try again.");
      }
    }
    postReview();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="review-title">TITLE:</label>
        <input
          type="text"
          id="review-title"
          placeholder="Title"
          value={inputTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="review-body">YOUR REVIEW:</label>
        <textarea
          id="review-body"
          placeholder="Write your review..."
          value={inputBody}
          onChange={(e) => setBody(e.target.value)}
        />
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
        <input type="submit" value="SUBMIT REVIEW" />
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </>
  );
};

export default CreateReview;

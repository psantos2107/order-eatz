import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateReview = () => {
  const [inputTitle, setTitle] = useState("");
  const [inputBody, setBody] = useState("");
  const [inputRating, setRating] = useState("4");
  const [error, setError] = useState("");
  const { foodID } = useParams();
  const URL = "http://localhost:3000/api";

  function handleSumbit(e) {
    e.preventDefault();

    async function postReview() {
      try {
        await fetch(`${URL}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: inputTitle,
            content: inputBody,
            rating: inputRating,
            foodItem: foodID,
          }),
        });
        //SET STATE FOR THE REVIEWS ARRAY HERE (adding a review to the UI)! (YOU WILL LIKELY HAVE TO LIFT UP STATE AND PASS SET REVIEWS DOWN AS PROPS)
      } catch (error) {
        setError(
          "Something went wrong with submitting the review. Please try again."
        );
        return;
      }
    }
    postReview();
  }

  return (
    <form onSubmit={handleSumbit}>
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
      <input type="submit" value="SUBMIT REVIEW" />
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default CreateReview;

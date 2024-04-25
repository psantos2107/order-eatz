import { useState } from "react";
import EditReview from "./EditReview";

const Review = ({
  review,
  foodReviews,
  setFoodReviews,
  setMessage,
  forceUpdate,
}) => {
  const [editMode, setEditMode] = useState(false);
  const URL = "http://localhost:3000/api";

  function handleDelete() {
    async function deleteReview() {
      // Retrieve the token from local storage
      const token = localStorage.getItem('userToken');

      if (!token) {
        setMessage("You must be logged in to delete reviews.");
        return;
      }

      try {
        const res = await fetch(`${URL}/reviews/${review._id}`, {
          method: "DELETE",
          headers: {
            // Include the token in the Authorization header
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Unable to delete the review");
        }
        const data = await res.json();
        const { message } = data;
        setMessage(message);
        setFoodReviews(
          foodReviews.filter((foodReview) => foodReview._id !== review._id)
        );
      } catch (error) {
        console.log(error.message);
        setMessage(error.message);
      }
    }

    deleteReview();
  }

  function handleEdit() {
    setEditMode((mode) => !mode);
  }

  return (
    <>
      {!editMode ? (
        <article key={review._id}>
          <h2>
            <strong>{review.title}</strong>
          </h2>
          <p>{review.content}</p>
          <p>Rating: {review.rating}/5</p>
          <p>By: {review.createdBy.username}</p>
          <button onClick={handleEdit}>Edit Review</button>
          <button onClick={handleDelete}>Delete Review</button>
        </article>
      ) : (
        <EditReview
          review={review}
          setEditMode={setEditMode}
          setFoodReviews={setFoodReviews}
          forceUpdate={forceUpdate}
          setMessage={setMessage}
        />
      )}
    </>
  );
};

export default Review;

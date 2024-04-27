import { useState } from "react";
import EditReview from "./EditReview";
import { jwtDecode } from "jwt-decode";

const Review = ({
  review,
  foodReviews,
  setFoodReviews,
  setMessage,
  forceUpdate,
}) => {
  const [editMode, setEditMode] = useState(false);
  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("userToken");
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }

  function handleDelete() {
    async function deleteReview() {
      // Retrieve the token from local storage
      const token = localStorage.getItem("userToken");

      if (!token) {
        setMessage("You must be logged in to delete reviews.");
        return;
      }

      try {
        const res = await fetch(`${URL}/reviews/${review._id}`, {
          method: "DELETE",
          headers: {
            // Include the token in the Authorization header
            Authorization: `Bearer ${token}`,
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
        <article
          key={review._id}
          className="bg-slate-200 max-w-2xl mx-auto my-5 p-5 border rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-800">
            <strong>Title: {review.title}</strong>
          </h2>
          <p className="text-gray-700 my-2">{review.content}</p>
          <p className="text-gray-700">Rating: {review.rating}/5</p>
          <p className="text-gray-700 mb-4">By: {review.createdBy.username}</p>
          {decoded?.userId === review.createdBy._id && (
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Review
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete Review
              </button>
            </div>
          )}
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

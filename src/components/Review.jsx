import { useState } from "react";
import EditReview from "./EditReview";

const Review = ({ review, foodReviews, setFoodReviews }) => {
  const [editMode, setEditMode] = useState(false);

  function handleDelete() {
    //..code here to handle delete!
    console.log("Will be implemented later when I have the capacity.");
    //(1) delete from database
    //(2) reset the reviews array to display reviews minus the deleted review (utilize foodReviews and setFoodReviews)
  }

  function handleClick() {
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
          <button onClick={() => handleEdit()}>Edit Review</button>
          <button onClick={() => handleDelete()}>Delete Review</button>
        </article>
      ) : (
        <EditReview
          review={review}
          setEditMode={setEditMode}
          setFoodReviews={setFoodReviews}
        />
      )}
    </>
  );
};

export default Review;

import { useState } from "react";

const Review = ({ review }) => {
  const [editMode, setEditMode] = useState(false);

  function handleDelete() {
    //..code here to handle delete!
    console.log("Will be implemented later when I have the capacity.");
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
          <button onClick={() => handleClick()}>Edit Review</button>
          <button onClick={() => handleDelete()}>Delete Review</button>
        </article>
      ) : (
        <article>
          <h2>In Edit mode</h2>
          <button onClick={() => handleClick()}>Submit Review</button>
        </article>
      )}
    </>
  );
};

export default Review;

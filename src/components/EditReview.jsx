import { useState } from "react";

const EditReview = ({ review, setEditMode, setMessage, forceUpdate }) => {
  const [inputTitle, setTitle] = useState(review.title);
  const [inputBody, setBody] = useState(review.content);
  const [inputRating, setRating] = useState(review.rating);
  const [error, setError] = useState("");
  const URL = "http://localhost:3000/api";

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("userToken"); // Retrieve the token from local storage

    if (!token) {
      setError("You must be logged in to edit reviews.");
      return;
    }

    async function updateReview() {
      try {
        const res = await fetch(`${URL}/reviews/${review._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify({
            title: inputTitle,
            content: inputBody,
            rating: inputRating,
          }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Unable to edit the review.");
        }
        const { message } = await res.json();
        setMessage(message);
        forceUpdate(); // Trigger a re-render/refresh
        setEditMode(false); // Exit edit mode
      } catch (error) {
        console.error("Error updating review:", error);
        setError(
          "Something went wrong with editing the review. Please try again."
        );
      }
    }
    updateReview();
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <label htmlFor="review-title">TITLE:</label>
    //   <input
    //     type="text"
    //     id="review-title"
    //     placeholder="Title"
    //     value={inputTitle}
    //     onChange={(e) => setTitle(e.target.value)}
    //   />
    //   <label htmlFor="review-body">YOUR REVIEW:</label>
    //   <textarea
    //     id="review-body"
    //     placeholder="Write your review..."
    //     value={inputBody}
    //     onChange={(e) => setBody(e.target.value)}
    //   />
    //   <label htmlFor="review-rating">FOOD RATING:</label>
    //   <select
    //     id="review-rating"
    //     value={inputRating}
    //     onChange={(e) => setRating(e.target.value)}
    //   >
    //     <option value="1">1</option>
    //     <option value="2">2</option>
    //     <option value="3">3</option>
    //     <option value="4">4</option>
    //     <option value="5">5</option>
    //   </select>
    //   <button type="button" onClick={() => setEditMode(false)}>
    //     EXIT EDITING MODE
    //   </button>
    //   <input type="submit" value="SUBMIT REVIEW" />
    //   {error && <p className="text-red-600">{error}</p>}
    // </form>
    <main className="w-full bg-white border-2 border-black">
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl text-center font-bold underline mb-6">
          Write your own review!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="review-title"
              className="block text-sm font-medium text-gray-700"
            >
              TITLE:
            </label>
            <input
              type="text"
              id="review-title"
              placeholder="Title"
              value={inputTitle}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="review-body"
              className="block text-sm font-medium text-gray-700"
            >
              YOUR REVIEW:
            </label>
            <textarea
              id="review-body"
              placeholder="Write your review..."
              value={inputBody}
              onChange={(e) => setBody(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="review-rating"
              className="block text-sm font-medium text-gray-700 mr-3"
            >
              FOOD RATING:
            </label>
            <select
              id="review-rating"
              value={inputRating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-36"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
            >
              EXIT EDITING MODE
            </button>
          </div>
          <input
            type="submit"
            value="SUBMIT REVIEW"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default EditReview;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FoodDetails from "../components/FoodDetails";
import CreateReview from "../components/CreateReview";

const FoodShowPage = () => {
  const { id } = useParams();
  const [foodReviews, setFoodReviews] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dummy, setDummy] = useState(1);
  const token = localStorage.getItem("userToken");
  const URL = import.meta.env.VITE_API_URL;

  const forceUpdate = function () {
    setDummy((dummy) => dummy + 1);
  };

  const fetchReviews = async () => {
    try {
      //errors to consider: what if the food was not found?
      //what if there was a network error?
      const res = await fetch(`${URL}/reviews/food/${id}`);
      const reviewArr = await res.json();
      console.log(reviewArr);
      setFoodReviews(reviewArr);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Unable to fetch reviews at this time.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [dummy]);

  return (
    <main className="py-20">
      <h2 className="text-2xl p-4">
        <strong>
          <em>See what other users had to say about our food items... 🤔 </em>
        </strong>
      </h2>
      <FoodDetails
        id={id}
        error={error}
        foodReviews={foodReviews}
        setFoodReviews={setFoodReviews}
        message={message}
        setMessage={setMessage}
        forceUpdate={forceUpdate}
      />
      {token && (
        <CreateReview
          id={id}
          setMessage={setMessage}
          forceUpdate={forceUpdate}
        />
      )}
    </main>
  );
};

export default FoodShowPage;

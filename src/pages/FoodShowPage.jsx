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
  const URL = "http://localhost:3000/api";

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
    <div className="my-20">
      <FoodDetails
        id={id}
        error={error}
        foodReviews={foodReviews}
        setFoodReviews={setFoodReviews}
        message={message}
        setMessage={setMessage}
        forceUpdate={forceUpdate}
      />
      <CreateReview id={id} setMessage={setMessage} forceUpdate={forceUpdate} />
    </div>
  );
};

export default FoodShowPage;

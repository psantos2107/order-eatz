import FoodDescription from "../components/FoodDescription";
import FoodReviews from "../components/FoodReviews";

const FoodDetails = ({
  id,
  foodReviews,
  error,
  setFoodReviews,
  message,
  setMessage,
  forceUpdate,
}) => {
  return (
    <>
      <FoodDescription />
      {message && <p>{message}</p>}
      <FoodReviews
        id={id}
        foodReviews={foodReviews}
        error={error}
        setFoodReviews={setFoodReviews}
        setMessage={setMessage}
        forceUpdate={forceUpdate}
      />
    </>
  );
};

export default FoodDetails;

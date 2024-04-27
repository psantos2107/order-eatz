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
    // Main section containing food details and reviews
    <main className="flex justify-center" style={{ maxHeight: "770px" }}>
      {/* Section for food description */}
      <section className="w-1/2 border-solid border-black border-2 bg-white">
        {/* Render the FoodDescription component */}
        <FoodDescription />
        {/* Display message if available */}
        {message && (
          <p className="text-center text-2xl italic mb-2">{message}</p>
        )}
      </section>
      {/* Render the FoodReviews component */}
      <FoodReviews
        id={id}
        foodReviews={foodReviews}
        error={error}
        setFoodReviews={setFoodReviews}
        setMessage={setMessage}
        forceUpdate={forceUpdate}
      />
    </main>
  );
};

export default FoodDetails;

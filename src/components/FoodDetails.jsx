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
    <main className="flex justify-center" style={{ maxHeight: "770px" }}>
      <section className="w-1/2 border-solid border-black border-2">
        <FoodDescription />
        {message && (
          <p className="text-center text-2xl italic mb-2">{message}</p>
        )}
      </section>
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

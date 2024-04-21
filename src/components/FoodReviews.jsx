import Review from "./Review";

const FoodReviews = ({
  foodReviews,
  setFoodReviews,
  error,
  setMessage,
  forceUpdate,
}) => {
  if (error) {
    return <h2>Error: {error}</h2>;
  } else {
    return (
      <>
        {foodReviews.length === 0 ? (
          <h2>No food reviews are made yet for this food/drink.</h2>
        ) : (
          <section>
            {foodReviews.map((review) => {
              return (
                <Review
                  review={review}
                  setFoodReviews={setFoodReviews}
                  foodReviews={foodReviews}
                  setMessage={setMessage}
                  forceUpdate={forceUpdate}
                />
              );
            })}
          </section>
        )}
      </>
    );
  }
};

export default FoodReviews;

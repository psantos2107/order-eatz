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
          <header className="p-5  bg-white border-solid border-black border-2 w-1/2">
            <h2 className="py-20 text-center" style={{ fontSize: "50px" }}>
              No food reviews are made yet for this food/drink.
            </h2>
          </header>
        ) : (
          <section className="p-5 bg-white border-solid border-black border-2 w-1/2 overflow-scroll">
            <h2 className="text-2xl text-center">REVIEWS</h2>
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

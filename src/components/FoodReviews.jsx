import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Review from "./Review";

const FoodReviews = () => {
  const [foodReviews, setFoodReviews] = useState([]);
  const [error, setError] = useState("");
  const URL = "http://localhost:3000/api";
  let { foodID } = useParams();

  //useCallback is used to cache fetchReview between re-renders to prevent excessive function re-renders in order to optimize performance of the app. fetchReviews will only be re-rendered if foodID changes (like when the params change)
  const fetchReviews = useCallback(async () => {
    try {
      //errors to consider: what if the food was not found?
      //what if there was a network error?
      const res = await fetch(`${URL}/reviews/food/${foodID}`);
      const reviewArr = await res.json();
      setFoodReviews(reviewArr);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Unable to fetch reviews at this time.");
    }
  }, [foodID]); // `fetchReviews` now only changes if foodID changes

  useEffect(() => {
    fetchReviews();
  }, [foodID, fetchReviews]); // React to changes in foodID and fetchReviews

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
              return <Review review={review} />;
            })}
          </section>
        )}
      </>
    );
  }
};

export default FoodReviews;

/* FOR ME.
async function fetchReviews() {
    try {
      const res = await fetch(`${URL}/reviews/food/${foodID}`);
      const reviewArr = await res.json();
      setFoodReviews(reviewArr);
    } catch (error) {
      setError("Unable to fetch reviews at this time.");
      return;
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []); 
  
When to use the useCallback hook
Now you understand how the useCallback hook can optimize your app, let’s see some use cases:

When you need to pass a function as props to a child component.
If you have a function that is expensive to compute and you need to call it in multiple places.
When dealing with functional components.
When you are working with a function that relies on external data or state.
Note: Given the scenarios highlighted above, it’s still important to weigh the benefits and drawbacks of the hook and use it judiciously only where needed.

*/

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function FoodDescription({ idForFoodPreview }) {
  // Extracting the id parameter from the URL
  const { id } = useParams();

  // State to hold the details of the food item
  const [foodItem, setFoodItem] = useState(null);

  // Hook to navigate to different routes
  let navigate = useNavigate();

  // Function to add food item to order
  const goToOrderPage = () => {
    navigate("/order");
  };

  useEffect(() => {
    // Function to fetch the details of a specific food item
    const fetchFoodItem = async () => {
      try {
        // Fetching food item details based on the id parameter
        if (idForFoodPreview || id) {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/food/${idForFoodPreview || id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch food item details");
          }
          const data = await response.json();
          setFoodItem(data);
        }
      } catch (error) {
        console.error("Error fetching food item details:", error);
      }
    };

    // Call the fetchFoodItem function when the component mounts or when the id parameter changes
    fetchFoodItem();
  }, [id, idForFoodPreview]); // Run this effect when the component mounts or when the id parameter changes

  return (
    <div className={`p-4  bg-white`}>
      {/* Title for food details */}
      <h2 className="text-2xl mb-4 text-center">Food Details</h2>
      {foodItem ? (
        // Display food details if available
        <div className={`flex flex-col justify-center items-center `}>
          {/* Display food image */}
          <img
            src={foodItem.image}
            alt={foodItem.name}
            className={`rounded-lg mb-4 setMaxImgSizeShowPage block ${
              idForFoodPreview && "setMaxImgSizeOrderPage block"
            }`}
          />
          {/* Display food name */}
          <h3 className="text-xl mb-2">{foodItem.name}</h3>
          {/* Display food description */}
          <p className="text-gray-700 mb-2">{foodItem.description}</p>
          {/* Display food price */}
          <p className="text-gray-700 mb-2">Price: ${foodItem.price}</p>
          {/* Display food allergens */}
          <p className="text-gray-700 mb-2">
            Allergens: {foodItem.allergens.join(", ")}
          </p>
          {/* Display food category if available */}
          {foodItem.category && (
            <p className="text-gray-700 mb-2">Category: {foodItem.category}</p>
          )}
          {/* Buttons for navigation */}
          {id ? (
            // If id is available, display buttons for navigation
            <div>
              <button
                onClick={goToOrderPage}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Go to Order Page
              </button>
              <Link
                to="/food"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Back To Menu
              </Link>
              <Link
                to="/home"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Home
              </Link>
            </div>
          ) : (
            // If idForFoodPreview is available, display link for reviews
            <Link
              to={`/food/${idForFoodPreview}`}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Click here to read users' reviews!
            </Link>
          )}
        </div>
      ) : (
        // Display loading message if foodItem is not available
        <p>
          {id
            ? "Loading..."
            : 'Click on "see food details" to see more info on a specific food!'}
        </p>
      )}
    </div>
  );
}

export default FoodDescription;

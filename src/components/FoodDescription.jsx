import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function FoodDescription() {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);

  // Function to add food item to order
  const addToOrder = () => {
    //  logic to add the food item to the order
    // For now, let's just log a message
    console.log(`Added ${foodItem.name} to order`);
  };

  useEffect(() => {
    // Function to fetch the details of a specific food item
    const fetchFoodItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/food/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch food item details");
        }
        const data = await response.json();
        setFoodItem(data);
      } catch (error) {
        console.error("Error fetching food item details:", error);
      }
    };

    // Call the fetchFoodItem function when the component mounts or when the id parameter changes
    fetchFoodItem();
  }, [id]); // Run this effect when the component mounts or when the id parameter changes

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Food Details</h2>
      {foodItem ? (
        <div>
          <img
            src={foodItem.image}
            alt={foodItem.name}
            className="rounded-lg mb-4"
          />
          <h3 className="text-xl mb-2">{foodItem.name}</h3>
          <p className="text-gray-700 mb-2">{foodItem.description}</p>
          <p className="text-gray-700 mb-2">Price: ${foodItem.price}</p>
          <p className="text-gray-700 mb-2">
            Allergens: {foodItem.allergens.join(", ")}
          </p>
          {foodItem.category && (
            <p className="text-gray-700 mb-2">Category: {foodItem.category}</p>
          )}
          <button
            onClick={addToOrder}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Add to Order
          </button>
          <Link
            to="/food"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FoodDescription;

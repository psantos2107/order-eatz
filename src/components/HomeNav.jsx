import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomeNav() {
  // State to hold the featured items
  const [featuredItems, setFeaturedItems] = useState([]);

  // Retrieve user authentication token if available
  const userToken = localStorage.getItem("userToken");

  // Hook to navigate to different routes
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch(`${import.meta.env.VITE_API_URL}/food`)
      .then((response) => response.json())
      .then((data) => {
        // Get 3 random items from the fetched data
        const randomItems = getRandomItems(data, 3);
        setFeaturedItems(randomItems);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Function to get random items from the data
  const getRandomItems = (data, count) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div className="w-1/2 ml-12 bg-white p-3 border-2 border-solid border-black">
      {/* Title for the featured items */}
      <h1 className="text-2xl font-bold text-center" style={{ marginTop: "" }}>
        Featured Items
      </h1>
      <div className="">
        {/* Mapping through the featured items */}
        {featuredItems.map((item) => (
          <Link to={`/food/${item._id}`} key={item._id}>
            <div className="mb-4">
              {/* Displaying item name */}
              <h2 className="text-2xl">
                <strong>{item.name}</strong>
              </h2>
              {/* Displaying item image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "200px",
                  height: "160px",
                  border: "2px solid black",
                  padding: "20px",
                }}
              />
              {/* Displaying item description */}
              <p>{item.description}</p>
              {/* Displaying item price */}
              <p>Price: ${item.price}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* Buttons for creating personalized orders and viewing menu */}
      <div className="fixed bottom-0 right-0 mb-20 mr-4">
        {/* Show a personalized button if the user is logged in */}
        {userToken ? (
          <button
            onClick={() => navigate("/order")}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
          >
            Create Personalized Order
          </button>
        ) : (
          // Show a login button if the user is not logged in
          <Link to="/login" className="text-white">
            <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded">
              Log In to Create Orders
            </button>
          </Link>
        )}
        {/* General link to food menu, available to all */}
        <Link to="/food" className="ml-4 text-white">
          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
            View Menu
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomeNav;

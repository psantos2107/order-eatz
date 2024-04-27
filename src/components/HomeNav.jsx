import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomeNav() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const userToken = localStorage.getItem("userToken"); // Retrieve user authentication token if available
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("http://localhost:3000/api/food")
      .then((response) => response.json())
      .then((data) => {
        // Get 3 random items from the fetched data
        const randomItems = getRandomItems(data, 3);
        setFeaturedItems(randomItems);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const getRandomItems = (data, count) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div className="w-1/2 ml-12 bg-white p-3 border-2 border-solid border-black">
      <h1 className="text-2xl font-bold text-center" style={{ marginTop: "" }}>
        Featured Items
      </h1>
      <div className="">
        {featuredItems.map((item) => (
          <Link to={`/food/${item._id}`} key={item._id}>
            <div className="mb-4">
              <h2 className="text-2xl">
                <strong>{item.name}</strong>
              </h2>
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
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
          </Link>
        ))}
      </div>
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

/* fixed center-0 right-0 mb-40 mr-80 mt-4 (h1)*/
/* featured-items-container fixed top-0 right-0 mt-12 mr-4 div above the map*/

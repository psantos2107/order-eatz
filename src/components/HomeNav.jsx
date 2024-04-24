import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomeNav() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const userToken = localStorage.getItem('userToken'); // Retrieve user authentication token if available
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/food')
      .then(response => response.json())
      .then(data => {
        const randomItems = getRandomItems(data, 3);
        setFeaturedItems(randomItems);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getRandomItems = (data, count) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div>
      <h1 className="text-xl font-bold fixed top-0 right-0 mt-4 mr-80">Featured Items</h1>
      <div className="fixed top-0 right-0 mt-12 mr-4">
        {featuredItems.map(item => (
          <Link to={`/food/${item._id}`} key={item._id}>
            <div className="mb-4">
              <h2>{item.name}</h2>
              <img src={item.image} alt={item.name} style={{ width: '200px', height: '140px', border: '2px solid black', padding: '20px' }} />
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-0 right-0 mb-20 mr-4">
        {/* Show a personalized button if the user is logged in */}
        {userToken ? (
          <button onClick={() => navigate('/order')} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
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

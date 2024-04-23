import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomeNav() {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('http://localhost:3000/api/food')
      .then(response => response.json())
      .then(data => {
        // Get 3 random items from the fetched data
        const randomItems = getRandomItems(data, 3);
        setFeaturedItems(randomItems);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Function to get random items from the fetched data
  const getRandomItems = (data, count) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div>
      <h1 className="text-xl font-bold fixed center-0 right-0 mb-40 mr-80 mt-4" style={{ marginTop: '80px' }}>Featured Items</h1>
      <div className="fixed center-0 right-0 mb-50 mr-4 featured-items" style={{ marginTop: '100px' }}>
        {/* Display the fetched featured items */}
        {featuredItems.map(item => (
          <Link to={`/food/${item._id}`} key={item._id} className="mb-4">
            <div>
              <h2>{item.name}</h2>
              <img src={item.image} alt={item.name} style={{ width: '200px', height: '140px', border: '2px solid black', padding: '20px' }} />
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-0 right-0 mb-20 mr-4">
        {/* Link to create an order */}
        <Link to="/food" className="text-white">
          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-4">
            Create Order
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomeNav;

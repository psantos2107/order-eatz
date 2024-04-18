import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

function FoodDescriptionComponent() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Function to fetch menu items
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/food');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    // Call the fetchMenuItems function when the component mounts
    fetchMenuItems();
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      <h2>Food Descriptions</h2>
      {menuItems.length > 0 ? (
        <ul>
          {menuItems.map(item => (
            <li key={item._id}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No menu items available</p>
      )}
    </div>
  );
}

export default FoodDescriptionComponent;

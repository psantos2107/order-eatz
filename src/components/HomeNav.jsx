import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomeNav() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend API
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/food/:id');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4">
      <div className="text-white">
        <h1 className="text-2xl font-bold">OrderEatz</h1>
      </div>
      <div className="flex">
        <Link to="/" className="text-white mx-4 hover:text-gray-300">Home</Link>
        <Link to="/food" className="text-white mx-4 hover:text-gray-300">Start Order</Link>
        <Link to="/order" className="text-white mx-4 hover:text-gray-300">Your Order</Link>
        {categories.map(category => (
           <Link to={`/category/${foodItem.category}`} className="text-blue-600 hover:underline ml-1">
           {foodItem.category}
         </Link>
        ))}
      </div>
    </nav>
  );
}

export default HomeNav;

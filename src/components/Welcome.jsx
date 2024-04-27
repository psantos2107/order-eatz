import React from 'react';
import '../index.css'; // Import your CSS file for styling

function Welcome() {
  return (
    <div className="container mx-auto mt-8 welcome-container">
      <h1 className="text-3xl font-bold mb-4 welcome-text">Welcome to Order Eatz</h1>
      <p className="text-lg ml-10">Explore our delicious menu and place your order!</p>
      <div className="food-animation">
        <div className="food-item wrap"></div>
        <div className="food-item quesadilla"></div>
        <div className="food-item wings"></div>
        <div className="food-item cake"></div>
        <div className="food-item lemonade"></div>
        {/* Add more food items as needed */}
      </div>
    </div>
  );
}

export default Welcome;

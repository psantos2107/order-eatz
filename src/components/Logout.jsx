import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth from AuthContext

function Logout() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Consume the auth context

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove the token from local storage
    setIsAuthenticated(false); // Update the authentication state
    navigate('/'); // Navigate to the welcome page
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
}

export default Logout;

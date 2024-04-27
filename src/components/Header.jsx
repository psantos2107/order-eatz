import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Ensure correct import for jwt-decode

const Header = () => {
  const navigate = useNavigate(); // Hook for navigating programmatically
  const [showDropdown, setShowDropdown] = useState(false); // State for controlling dropdown visibility
  const [userProfilePic, setUserProfilePic] = useState('default-profile-pic-url'); // Placeholder for default profile pic
  const [userId, setUserId] = useState(null); // State to store user's ID
  const dropdownRef = useRef(null); // Ref for the dropdown for potential use cases like outside click

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        try {
            const decoded = jwtDecode(userToken); // Decode token to get user details
            setUserId(decoded.userId); // Set user ID from token
            // Set user profile picture, defaulting to a placeholder if none
            setUserProfilePic(decoded.profilePic ? `http://localhost:3000/uploads/${decoded.profilePic}` : 'default-profile-pic-url');
        } catch (error) {
            console.error('Error decoding token:', error); // Error handling for token decoding
        }
    } else {
        setUserProfilePic('default-profile-pic-url'); // Reset to default on logout
        setUserId(null);
    }
}, []); // Removed incorrect dependency

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove token from storage
    navigate('/login'); // Navigate to login page
    setShowDropdown(false); // Close dropdown menu
    setUserProfilePic('default-profile-pic-url'); // Reset profile picture
    setUserId(null); // Clear user ID
  };

  return (
    <div className="bg-black py-3 flex justify-between items-center fixed w-full top-0 left-0 z-10" ref={dropdownRef}>
      <div className="text-white ml-4 text-2xl font-bold">OrderEatz</div>
      <div className="flex items-center text-white">
        {/* Navigation links */}
        <Link to="/home" className="mx-4" onClick={() => setShowDropdown(false)}>Home</Link>
        <Link to="/food" className="mx-4" onClick={() => setShowDropdown(false)}>Menu</Link>
        <Link to="/order" className="mx-4" onClick={() => setShowDropdown(false)}>Order Now</Link>
        {userId ? (
          <>
            {/* User profile and dropdown menu */}
            <img src={userProfilePic} alt="Profile" className="mx-4 h-8 w-8 rounded-full cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} />
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-xl z-20">
                <Link to={`/user/${userId}`} className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white" onClick={() => setShowDropdown(false)}>My Profile</Link>
                <Link to="/edit-profile" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white" onClick={() => setShowDropdown(false)}>Settings</Link>
                <button onClick={handleLogout} className="text-left w-full px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white focus:outline-none">Logout</button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Links shown when user is not logged in */}
            <Link to="/login" className="mx-4" onClick={() => setShowDropdown(false)}>Login</Link>
            <Link to="/signup" className="mx-4" onClick={() => setShowDropdown(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState('default-profile-pic-url'); // Placeholder for default profile pic
  const [userId, setUserId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        try {
            const decoded = jwtDecode(userToken);
            setUserId(decoded.userId);
            setUserProfilePic(decoded.profilePic ? `http://localhost:3000/uploads/${decoded.profilePic}` : 'default-profile-pic-url');
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    } else {
        setUserProfilePic('default-profile-pic-url');
        setUserId(null);
    }
}, [localStorage.getItem('userToken')]); // This should actually be [userToken]


  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
    setShowDropdown(false);
    setUserProfilePic('default-profile-pic-url');
    setUserId(null);
  };

  return (
    <div className="bg-black py-3 flex justify-between items-center fixed w-full top-0 left-0 z-10" ref={dropdownRef}>
      <div className="text-white ml-4 text-2xl font-bold">
        <img src="https://i.imgur.com/8JuGwUt.jpg" alt="" style={{ width: "410px", height: "60px"}}/></div>
      <div className="flex items-center text-white">
        <Link to="/home" className="mx-4" onClick={() => setShowDropdown(false)}>Home</Link>
        <Link to="/food" className="mx-4" onClick={() => setShowDropdown(false)}>Menu</Link>
        <Link to="/order" className="mx-4" onClick={() => setShowDropdown(false)}>Order Now</Link>
        {userId ? (
          <>
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
            <Link to="/login" className="mx-4" onClick={() => setShowDropdown(false)}>Login</Link>
            <Link to="/signup" className="mx-4" onClick={() => setShowDropdown(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

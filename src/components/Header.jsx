import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const decoded = userToken ? jwtDecode(userToken) : null;
  const userId = decoded?.userId;
  const userProfilePic = decoded?.profilePic || "default-profile-pic-url";

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
    setShowDropdown(false);
  };

  return (
    <div className="bg-black py-3 flex justify-between items-center fixed w-full top-0 left-0 z-10">
      <div className="text-white ml-4 text-2xl font-bold">OrderEatz</div>
      <div className="flex items-center text-white" ref={dropdownRef}>
        <Link className="mx-4" to="/home" onClick={() => setShowDropdown(false)}>Home</Link>
        <Link className="mx-4" to="/food" onClick={() => setShowDropdown(false)}>Menu</Link>
        <Link className="mx-4" to="/order" onClick={() => setShowDropdown(false)}>Order Now</Link>
        {userToken && (
          <>
            <img
              src={userProfilePic}
              alt="Profile"
              className="mx-4 h-8 w-8 rounded-full cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 w-48 bg-white rounded-md shadow-xl z-20"
                   style={{ top: '100%', transform: 'translateY(-10px)' }}> {/* Move closer to the profile picture */}
                <Link
                  to={`/user/${userId}`}
                  className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                  onClick={() => setShowDropdown(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left w-full px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white focus:outline-none"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
        {!userToken && (
          <>
            <Link className="mx-4" to="/login" onClick={() => setShowDropdown(false)}>Login</Link>
            <Link className="mx-4" to="/signup" onClick={() => setShowDropdown(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

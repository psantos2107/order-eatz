import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken"); // Check if the user is logged in
  const decoded = userToken ? jwtDecode(userToken) : { userId: null };
  const userId = decoded.userId; // Optionally store user ID in local storage when logging in

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear the token from local storage
    localStorage.removeItem("userId"); // Clear the user ID from local storage
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="bg-black py-6 justify-between flex fixed w-full top-0 left-0">
      <div className="text-white ml-4 text-2xl font-bold">OrderEatz</div>
      <div className="text-white">
        <Link className="mx-4" to="/home">
          Home
        </Link>
        {userToken && (
          <Link className="mx-4" to={`/user/${userId}`}>
            My Profile
          </Link>
        )}
        <Link className="mx-4" to="/food">
          Menu
        </Link>
        <Link className="mx-4" to="/order">
          Order Now
        </Link>
        {userToken ? (
          <button className="mx-4 text-white" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="mx-4" to="/login">
              Login
            </Link>
            <Link className="mx-4" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

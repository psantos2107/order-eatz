import React from "react";
import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";
import SignUp from "../components/SignUp";

const WelcomePage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="flex-1 max-w-4xl mx-auto p-8">
        {/* Welcome message */}
        <Welcome />
        {/* Optional: Hero Image or Graphic */}
      </div>
      <div className="flex-1 max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg">
        {/* Sign Up Form */}
        <SignUp />
        {/* Button for existing users to navigate to the login page */}
        <div className="text-center mt-4">
          <p className="text-gray-600">Already have an account?</p>
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-700 transition duration-300 ease-in-out"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

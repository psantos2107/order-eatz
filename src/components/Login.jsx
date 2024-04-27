import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Custom hook from the AuthContext for authentication state

function Login() {
  // State for login credentials, initialized to empty strings
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  // State to manage error messages
  const [error, setError] = useState("");
  // useNavigate hook to programmatically navigate user after login
  const navigate = useNavigate();
  // Access setIsAuthenticated function from auth context to update auth state
  const { setIsAuthenticated } = useAuth();

  // Function to update state with form input changes
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setError(""); // Reset any previous error messages

    try {
      // Attempt to login via API call
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`, // Fetches from environment-specific API URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials), // Send credentials as JSON
        }
      );

      if (!response.ok) {
        // If response is not ok, throw an error with the message from the server
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      // Parse JSON response and store token in local storage
      const data = await response.json();
      localStorage.setItem("userToken", data.token);
      setIsAuthenticated(true); // Update authentication state to true
      navigate("/home"); // Navigate to home page after successful login
    } catch (error) {
      setError(error.message); // Set error state to display the error message
    }
  };

  // JSX to render the login form
  return (
    <div className="max-w-md mx-auto mt-10 px-4 py-8 bg-white shadow-lg rounded-lg">
      {/* Placeholder for potential food animation */}
      <div className="food-animation">
        <div className="food-item lasagna"></div>
        {/* ... more food items ... */}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input fields for username and password */}
        {/* Error message display */}
        {/* Submit button */}
      </form>
    </div>
  );
}

export default Login;

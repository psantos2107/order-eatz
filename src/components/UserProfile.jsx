import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams(); // Retrieving the userId from the URL parameters
  const navigate = useNavigate(); // Hook to programmatically navigate
  // State for user data, initialized to defaults
  const [user, setUser] = useState({
    username: "",
    email: "",
    name: "",
    lastName: "",
    photo: "",
    bio: "",
    foodInterests: [],
    createdAt: "",
  });
  const [error, setError] = useState(""); // State to hold any error message
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  // Effect hook to fetch user data on component mount or when userId changes
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken'); // Get auth token from local storage
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {}; // Set auth headers if token exists
      setIsLoading(true); // Set loading state to true while fetching data
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId || 'profile'}`, { method: 'GET', headers });
        if (!response.ok) {
          throw new Error('Failed to fetch user data'); // Error handling for unsuccessful fetch
        }
        const userData = await response.json();
        setUser({
          ...userData,
          photo: userData.photo ? `http://localhost:3000/${userData.photo}` : 'default-profile-image.png' // Set user photo or default
        });
      } catch (err) {
        console.error('Error fetching user data:', err); // Log error to console
        setError(err.message || 'Error fetching user data.'); // Set error message for display
      } finally {
        setIsLoading(false); // Set loading state to false after fetch
      }
    };

    fetchUserData();
  }, [userId, navigate]); // Dependencies array for effect

  // Function to format dates to a readable string
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    // Loading state indicator
    return <div>Loading...</div>;
  }
  

  // JSX to render user profile information
  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg text-center">
      {/* Conditionally render user photo or placeholder */}
      <h1 className="text-2xl font-bold mt-4">
        {/* Display user's full name */}
      </h1>
      <button
        // Button to navigate to the edit-profile route
      >
        Edit Profile
      </button>
      <div className="mt-6 text-left leading-7 border-t pt-4">
        {/* Bio section */}
        <p className="text-gray-600 mt-2">{user.bio || "No bio available"}</p>
        {/* Food Interests section */}
      </div>
      <div className="mt-4">
        {/* Account creation date */}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>} {/* Display error if present */}
    </div>
  );
}

export default UserProfile;

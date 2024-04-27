import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate(); // Provides navigation via imperative API

  // State for storing and updating the user profile data
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    name: "",
    lastName: "",
    bio: "",
    foodInterests: [], // Array to store multiple selections
  });

  // State to store error messages
  const [error, setError] = useState("");

  // Effect hook to fetch profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/login"); // Redirect to login if no token found
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) {
        setError("Failed to fetch profile data");
        return;
      }
      const data = await response.json();
      setProfileData({
        ...data,
        foodInterests: data.foodInterests || [], // Ensure it's an array even if null
      });
    };
    fetchProfileData();
  }, [navigate]);

  // Handler for form inputs changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "foodInterests") {
      const options = event.target.options;
      const value = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handler for submitting the profile updates
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("You must be logged in to edit your profile.");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/profile/update`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profileData)
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
      navigate("/user-profile"); // Navigate to profile page after successful update
    } catch (err) {
      setError(err.message); // Set error message from exception
    }
  };

  // Handler for account deletion
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    const token = localStorage.getItem('userToken');
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${profileData._id}`,
      { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } }
    );
    if (!response.ok) {
      setError('Failed to delete account');
      return;
    }
    localStorage.removeItem('userToken');
    navigate('/login'); // Redirect to login page after account deletion
  };

  // JSX for rendering the component
  return (
    <div className="max-w-md mx-auto mt-10 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>
      {error && <p className="text-red-500">{error}</p>} // Display error message if present
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields for updating profile */}
        {/* Various input fields for user profile data */}
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
        <button type="button" onClick={handleDeleteAccount} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Account</button>
      </form>
    </div>
  );
}

export default EditProfile;

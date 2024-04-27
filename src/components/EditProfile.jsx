import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    name: "",
    lastName: "",
    bio: "",
    foodInterests: [], // This will now be an array
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/login");
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
        foodInterests: data.foodInterests || [], // Ensure it's an array
      });
    };
    fetchProfileData();
  }, [navigate]);

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
      navigate("/user-profile");
    } catch (err) {
      setError(err.message);
    }
  };

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
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block">
          Username:
          <input type="text" name="username" value={profileData.username} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </label>
        <label className="block">
          Email:
          <input type="email" name="email" value={profileData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </label>
        <label className="block">
          Name:
          <input type="text" name="name" value={profileData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </label>
        <label className="block">
          Last Name:
          <input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </label>
        <label className="block">
          Bio:
          <textarea name="bio" value={profileData.bio} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </label>
        <label className="block">
          Food Interests:
          <select name="foodInterests" value={profileData.foodInterests} onChange={handleChange} multiple className="w-full p-2 border border-gray-300 rounded">
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="meat_lover">Meat Lover</option>
            <option value="seafood">Seafood</option>
          </select>
        </label>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
        <button type="button" onClick={handleDeleteAccount} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Account</button>
      </form>
    </div>
  );
}

export default EditProfile;

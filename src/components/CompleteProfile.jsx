import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CompleteProfile() {
  const [profileData, setProfileData] = useState({
    photo: '',
    bio: '',
    foodInterests: [] // Changed to expect an array
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    // If the field is foodInterests, wrap the single value in an array
    if (name === 'foodInterests') {
      setProfileData({ ...profileData, [name]: [value] });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
  
    if (!token) {
      console.error('No token found, redirecting to login');
      navigate('/login');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/users/profile/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...profileData, userId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || `Failed to update profile with status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Profile updated successfully:', data);
      navigate('/user-profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          type="text"
          name="photo"
          value={profileData.photo}
          onChange={handleChange}
          placeholder="Photo URL"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea 
          name="bio"
          value={profileData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select 
          name="foodInterests" // Ensure this matches the state variable
          value={profileData.foodInterests[0] || ''} // Handling the select as a single-value field
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select your food interest</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="meat_lover">Meat Lover</option>
          <option value="seafood">Seafood</option>
        </select>
        <button 
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Complete Profile
        </button>
      </form>
    </div>
  );
}

export default CompleteProfile;

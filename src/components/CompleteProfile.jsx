import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CompleteProfile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    bio: '',
    foodInterests: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'foodInterests') {
      // Wrap the value inside an array.
      // If it’s a multiselect, you might need a different approach to handle multiple selected values.
      setProfileData(prev => ({ ...prev, [name]: [value] }));
    } else {
      // For other inputs, just keep the value as it is.
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('userToken');
  
    if (!token) {
      setError('Authentication required, please log in.');
      navigate('/login');
      return;
    }
  
    const formData = new FormData();
    formData.append('bio', profileData.bio);
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }
    
    // Assuming foodInterests is an array
    formData.append('foodInterests', JSON.stringify(profileData.foodInterests));
  
    try {
      const response = await fetch('http://localhost:3000/api/users/profile/update', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || `Failed to update profile with status: ${response.status}`);
        return;
      }
  
      alert('Profile updated successfully.');
      navigate('/user-profile');  // Redirect to the profile page after successful update.
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input 
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded my-4"
        />
        <textarea 
          name="bio"
          value={profileData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full p-2 border border-gray-300 rounded my-4"
        />
        <select 
          name="foodInterests"
          value={profileData.foodInterests}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded my-4"
        >
          <option value="">Select your food interest</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="meat_lover">Meat Lover</option>
          <option value="seafood">Seafood</option>
        </select>
        <button 
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Complete Profile
        </button>
      </form>
    </div>
  );
}

export default CompleteProfile;

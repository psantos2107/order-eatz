import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    username: '',
    email: '',
    name: '',
    lastName: '',
    photo: '',
    bio: '',
    foodInterests: [],
    createdAt: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`http://localhost:3000/api/users/${userId || 'profile'}`, { method: 'GET', headers });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch user data');
      }
    };
    fetchUserData();
  }, [userId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: name === "foodInterests" ? value.split(',').map(item => item.trim()) : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('userToken');
    if (token) {
      const response = await fetch(`http://localhost:3000/api/users/profile/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update profile');
      }
    } else {
      setError('You must be logged in to edit profiles.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg text-center">
      {user.photo ? (
        <img src={user.photo} alt="Profile" className="w-40 h-40 rounded-full mx-auto" />
      ) : (
        <div className="w-40 h-40 rounded-full mx-auto bg-gray-200 flex items-center justify-center text-6xl text-gray-400">?</div>
      )}
      <h1 className="text-2xl font-bold mt-4">{user.name} {user.lastName}</h1>
      <div className="flex justify-center gap-4 mt-4">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="username" value={user.username} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="text" name="name" value={user.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <textarea name="bio" value={user.bio} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="text" name="foodInterests" value={user.foodInterests.join(', ')} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save Changes
            </button>
            <button type="button" onClick={handleEditToggle} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </form>
        ) : (
          <>
            <button onClick={handleEditToggle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit Profile
            </button>
            <div className="mt-6 text-left leading-7 border-t pt-4">
              <h2 className="text-lg font-semibold">Bio</h2>
              <p className="text-gray-600 mt-2">{user.bio || 'No bio available'}</p>
              <h2 className="text-lg font-semibold mt-4">Food Interests</h2>
              <ul className="list-disc pl-5 mt-2">
                {user.foodInterests.length > 0 ? user.foodInterests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                )) : <li>No food interests listed.</li>}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Account Created On</h3>
              <p className="text-gray-600">{formatDate(user.createdAt)}</p>
            </div>
          </>
        )}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default UserProfile;

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
    bio: '',          // Include bio in the initial state
    foodInterests: [] // Include foodInterests in the initial state
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken'); // May be null if not logged in
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId || 'profile'}`, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setError(error.message || 'Failed to fetch user data');
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
    if (name === "foodInterests") {
      setUser(prevUser => ({
        ...prevUser,
        [name]: value.split(',').map(item => item.trim()) // Assuming interests are submitted as comma-separated values
      }));
    } else {
      setUser(prevUser => ({
        ...prevUser,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('You must be logged in to edit profiles.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/profile/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      setIsEditing(false); // Turn off edit mode on successful update
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold mb-4">User Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!isEditing ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Bio: {user.bio}</p>
          {user.photo && <img src={user.photo} alt="Profile" className="w-20 h-20 rounded-full" />}
          <ul>
            {user.foodInterests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
          <button onClick={handleEditToggle} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={user.username} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="name" value={user.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <textarea name="bio" value={user.bio} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="foodInterests" value={user.foodInterests.join(', ')} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save Changes
          </button>
          <button onClick={handleEditToggle} className="mt-4 ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default UserProfile;

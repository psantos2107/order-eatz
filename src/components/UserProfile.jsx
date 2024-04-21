import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    name: '',
    lastName: '',
    photo: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`, 
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users/profile/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
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
          {user.photo && <img src={user.photo} alt="Profile" className="w-20 h-20 rounded-full" />}
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

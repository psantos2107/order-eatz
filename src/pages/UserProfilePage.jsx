import React, { useState, useEffect } from 'react';

function UserProfilePage() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    name: '',
    lastName: '',
    photo: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/profile', { // Adjust the API endpoint as needed
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure you are sending a token if needed
          },               
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
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
    // Update user data logic here
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold mb-4">User Profile</h1>
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

export default UserProfilePage;

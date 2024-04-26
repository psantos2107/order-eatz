import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
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
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem('userToken');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId || 'profile'}`, { method: 'GET', headers });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchUserData();
  }, [userId]);

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
      <button
        onClick={() => navigate('/edit-profile')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
      >
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
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default UserProfile;

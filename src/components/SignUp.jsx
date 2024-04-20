import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    lastName: ''
  });
  const [error, setError] = useState(''); // State to store error message
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Clear previous errors
    setError('');

    if (!formData.username || !formData.email || !formData.password || !formData.name || !formData.lastName) {
      setError('Please fill in all fields');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }); 
      
      const data = await response.json(); // Get data from the response body regardless of the response status
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`); // Use server's error message if available
      }

      localStorage.setItem('userToken', data.token); // Save the token to local storage
      navigate('/complete-profile'); // Navigate to 'complete-profile' on successful registration
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message); // Display a user-friendly error message
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 px-4 py-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>} {/* Display the error message if there is one */}
        <input 
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button 
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;

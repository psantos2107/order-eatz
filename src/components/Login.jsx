import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth from AuthContext

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Consume the auth context

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const data = await response.json();
      localStorage.setItem('userToken', data.token); // Ensure this key matches what you use in AuthContext
      setIsAuthenticated(true); // Update the auth context
      navigate('/home'); // Redirect to the home page
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 py-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username or Email"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input 
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="text-red-500 text-sm">{error}</div>
        <button 
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;

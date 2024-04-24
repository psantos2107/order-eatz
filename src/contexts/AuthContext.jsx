import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    // Check the storage for a token or other authentication data
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    // Check auth status when the component mounts
    checkAuth();
  }, []);

  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

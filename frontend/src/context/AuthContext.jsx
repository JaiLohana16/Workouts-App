import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', credentials);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setErrorMessage('Invalid login credentials');
    }
  };

  async function signup (credentials) {
    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', credentials);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      return true;
    } catch (err) {
      console.log(err)
      const errorMsg = err.response?.data?.message || 'Error during signup';
      setErrorMessage(errorMsg);
      return false;
    }
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login,logout,signup, errorMessage,setErrorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import schoolLogo from '../assets/dmmmsu.png'; // Import the logo

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { name, password });
    try {
      const response = await axios.post('http://localhost:5000/api/login', { name, password });
      console.log('Login response:', response.data);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/quiz');
      } else {
        alert(response.data.message || 'Invalid login');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(`An error occurred: ${error.response?.data?.message || 'Please try again.'}`);
    }
  };
  

  return (
    <div className="login-container">
      <img src={schoolLogo} alt="School Logo" className="school-logo" />
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

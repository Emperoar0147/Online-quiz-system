import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import schoolLogo from '../assets/dmmmsu.png'; // Correct path to the logo
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('Attempting login with:', { name, password });
    
    try {
      const response = await axios.post('/api/login', { name, password });
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/quiz');
      } else {
        setError(response.data.message || 'Invalid login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <img src={schoolLogo} alt="School Logo" className="school-logo" />
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default HomePage;

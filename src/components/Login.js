import React, { useState } from 'react';
import API from '../services/api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Assuming you have a CSS file for styling

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      saveToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

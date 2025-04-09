import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // clear messages while typing
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/register', form);
      setSuccessMsg(response.data.message || 'Registration successful');
      setTimeout(() => navigate('/login'), 2000); // optional delay before redirect
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setErrorMsg(message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      {/* ✅ Success Message Box */}
      {successMsg && <div className="message success">{successMsg}</div>}

      {/* ❌ Error Message Box */}
      {errorMsg && <div className="message error">{errorMsg}</div>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

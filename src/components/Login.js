import React, { useState } from 'react';
import API from '../services/api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [type, setType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      saveToken(res.data.token);
      setMessage('✅ Login successful!');
      setType('success');
      setTimeout(() => navigate('/dashboard'), 1000); // redirect after 1 sec
    } catch (err) {
      setMessage('❌ Invalid email or password.');
      setType('error');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <div className={`message ${type}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

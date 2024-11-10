import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ isAuthenticated, setIsAuthenticated, error, setError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials check
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      setError(null);  // Clear any previous error

      navigate("/")
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
      <h1>Sign In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '1rem', margin: '0.5rem' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '1rem', margin: '0.5rem' }}
          />
        </div>
        <div>
          <button type="submit" style={{ padding: '1rem 2rem', fontSize: '1rem', backgroundColor: '#6c5ce7', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;

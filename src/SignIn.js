// SignIn.js
import React, { useState } from 'react';

function SignIn({ onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      // Send credentials to your authentication service
      const authResponse = await fetch('http://localhost:5000/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const authData = await authResponse.json();
      if (authData.success) {
        // Start the anon client
        const response = await fetch('http://localhost:5000/api/start-anon', {
          method: 'POST',
        });
        const data = await response.json();
        if (data.success) {
          onSignIn();
        } else {
          alert('Sign-in failed: ' + data.message);
        }
      } else {
        alert('Authentication failed: ' + authData.message);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('Error during sign-in: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
      <h1>Sign In</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        style={{ padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        style={{ padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
      />
      <br />
      <button
        onClick={handleSignIn}
        disabled={isLoading}
        style={{
          padding: '1rem 2rem',
          fontSize: '1rem',
          backgroundColor: '#6c5ce7',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        {isLoading ? 'Signing In...' : 'Sign in'}
      </button>
    </div>
  );
}

export default SignIn;

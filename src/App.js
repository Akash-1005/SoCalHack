import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Home from './components/Home';


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  console.log(isAuthenticated);

  return (
    <Routes>
      {
        isAuthenticated ? (
          <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated}/>} />
        ) : (
          <Route path="/login" element={<SignIn isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} error={error} setError={setError} />} />
        )
      }
    </Routes>
  );
}

export default App;

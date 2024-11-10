// HomePage.js
import React from 'react';
import { supabase } from './supabaseClient';

function HomePage({ user }) {
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default HomePage;

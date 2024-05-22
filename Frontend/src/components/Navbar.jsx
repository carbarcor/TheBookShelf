// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Shelf/userShelf';

export default function Navbar() {
  const { user } = useContext(UserContext);

  // Logout fungerar inte för tillfället då den inte är kopplad till backend. Det går att navigera genom http till de andra sidorna för tillfället.
  return (
    <nav>
      {user ? (
        <>
          <Link to='/mybooks'>Mina böcker</Link>
          <Link to='/dashboard'>Dashboard</Link>
          <button onClick={() => setUser(null)}>Logout</button>
        </>
      ) : (
        <>
          <Link to='/'>Home</Link>
          <Link to='/signup'>Register</Link>
          <Link to='/login'>Login</Link>
          
        </>
      )}
    </nav>
  );
}

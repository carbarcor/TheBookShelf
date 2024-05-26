import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Shelf/userShelf';

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevenire il comportamento predefinito del link
    try {
      await axios.post('/logout'); 
      setUser(null);
      navigate('/login'); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav>
      {user ? (
        <>
          <Link to='/mybooks'>Mina böcker</Link>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/logout' onClick={handleLogout}>Logout</Link>
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

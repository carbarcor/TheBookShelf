import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Shelf/userShelf';

// Komponent för meny / navbar
export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hantering av utloggningsprocess
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/logout'); 
      setUser(null);
      navigate('/login'); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Öppnar eller stänger meny
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Renderar meny-komponenten
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={toggleMobileMenu}>
        <img src="/src/img/logo.png" alt="Logo" />
      </div>
      <div className={`navbar-links ${isMobileMenuOpen ? 'navbar-links-mobile active' : ''}`}>
        {user ? (
          <>
            <Link to='/mybooks'>Mina böcker</Link>
            <Link to='/dashboard'>Sök böcker</Link>
            <a href="/logout" onClick={handleLogout}>Logga ut</a>
          </>
        ) : (
          <>
            <Link to='/'>Start</Link>
            <Link to='/signup'>Registrera</Link>
            <Link to='/login'>Logga in</Link>
          </>
        )}
      </div>
    </nav>
  );
}
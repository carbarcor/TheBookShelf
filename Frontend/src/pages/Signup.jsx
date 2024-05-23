import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'; // Se till att sökvägen är korrekt

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const signUpUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Kontrollera att lösenorden matchar
    if (data.password !== data.confirmPassword) {
      setError('Lösenorden matchar inte');
      return;
    }

    const { name, email, password } = data;

    try {
      // Skicka registreringsdata till servern
      const response = await axios.post('http://localhost:8000/signup', 
        { name, email, password },
        { withCredentials: true } // This ensures that cookies are sent
      );
      console.log('Registrering lyckades:', response.data);
      setSuccess('Registrering lyckades!');
      setData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/');
    } catch (err) {
      // Hantera fel och visa meddelanden för användaren
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Registrering misslyckades');
      } else {
        setError('Serverfel. Försök igen senare.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Registrera dig</h1>
      <form onSubmit={signUpUser}>
        <label>Namn</label>
        <input
          type="text"
          value={data.name}
          placeholder="Skriv namn..."
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label>E-mail</label>
        <input
          type="email"
          value={data.email}
          placeholder="Skriv e-mail..."
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Lösenord</label>
        <input
          type="password"
          value={data.password}
          placeholder="Skriv lösenord..."
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <label>Lösenord igen</label>
        <input
          type="password"
          value={data.confirmPassword}
          placeholder="Skriv lösenord igen..."
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Registrera dig</button>
      </form>
    </div>
  );
}

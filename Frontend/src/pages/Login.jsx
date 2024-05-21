import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { email, password } = data;
    console.log('Invio dati di login:', { email, password });

    try {
      const response = await axios.post('http://localhost:8000/login', 
        { email, password },
        { withCredentials: true } // This ensures that cookies are sent
      );
      console.log('Login lyckades:', response.data);
      setSuccess('Login lyckades!');
      setData({
        email: '',
        password: '',
      });
    } catch (err) {
      console.log('Errore durante il login:', err.response);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Login misslyckades');
      } else {
        setError('Serverfel. Försök igen senare.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}

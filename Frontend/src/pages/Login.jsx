import React, { useState, useContext } from 'react';// Importerar React och nödvändiga hooks
import axios from 'axios';// Importerar axios för att skicka HTTP-förfrågningar
import { UserContext } from '../../Shelf/userShelf'; // Importerar UserContext för att hantera användardata
import { useNavigate } from 'react-router-dom';// Importerar useNavigate för att navigera mellan sidor
import '../styles/login.css'; 

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });// Tillstånd för att lagra inloggningsdata

  const { setUser } = useContext(UserContext);// Hämta setUser-funktionen från UserContext för att uppdatera användardata
  const [error, setError] = useState('');// Tillstånd för att lagra felmeddelanden
  const [success, setSuccess] = useState('');// Tillstånd för att lagra framgångsmeddelanden
  const navigate = useNavigate();// Hook för att navigera mellan sidor

  // Funktion för att hantera inloggning
  const loginUser = async (e) => {
    e.preventDefault();// Förhindra standardformulärets skickande
    setError('');// Rensa felmeddelandet
    setSuccess('');// Rensa framgångsmeddelandet

    const { email, password } = data;// Destrukturera email och password från tillståndet
    console.log('Sending login data:', { email, password });

    try {
      // Skicka POST-förfrågan till backend för att logga in
      const response = await axios.post('http://localhost:8000/login', 
        { email, password },
        { withCredentials: true } // Detta säkerställer att cookies skickas
      );
      console.log('Login lyckades:', response.data);
      setSuccess('Login lyckades!');// Sätt framgångsmeddelande
      setUser(response.data.user);// Uppdatera användardata i UserContext
      setData({
        email: '',
        password: '',
      });// Rensa inloggningsformuläret
      navigate('/dashboard'); // Navigera till dashboard-sidan
    } catch (err) {
      console.log('Error during login:', err.response);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Login misslyckades');// Sätt felmeddelande om inloggningen misslyckas

      } else {
        setError('Serverfel. Försök igen senare.'); // Sätt generellt felmeddelande om något går fel med servern
      }
    }
  };

  return (
    <div className="login-container">
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

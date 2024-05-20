import React, { useState } from 'react';

export default function Signup() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const signUpUser = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError('Le password non coincidono');
    } else {
      setError('');
      // Aggiungi qui la logica per registrare l'utente, ad esempio una chiamata API
      console.log('Registrazione completata', data);
    }
  };

  return (
    <div>
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
          placeholder="Skriv lösenord..."
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrera dig</button>
      </form>
    </div>
  );
}

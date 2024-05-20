import React, { useState } from 'react';
import axios from 'axios'

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios.get('/')
    console.log('Login attempt', data);
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
        <button type="submit">Logga in!</button>
      </form>
    </div>
  );
}

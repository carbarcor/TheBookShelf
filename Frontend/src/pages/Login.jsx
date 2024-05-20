import React from 'react'

export default function Login() {
  const loginUser = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={loginUser}>
        <label>E-mail</label>
        <input type='email' placeholder='Skriv e-mail...'></input>
        <label>Lösenord</label>
        <input type='password' placeholder='Skriv lösenord...'></input>
        <button type='submit'>Logga in!</button>
      </form>
      
    </div>
  )
}

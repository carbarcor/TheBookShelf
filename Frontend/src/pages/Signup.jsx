import React from 'react'

export default function Signup() {
  const signUpUser = (e) => {
    e.preventDefault()

  }

  return (
    <div>
      <form onSubmit={ signUpUser }>
        <label>Namn</label>
        <input type='text' placeholder='Skriv namn...'></input>
        <label>E-mail</label>
        <input type='email' placeholder='Skriv e-mail...'></input>
        <label>Lösenord</label>
        <input type='password' placeholder='Skriv lösenord...'></input>
        <label>Lösenord igen</label>
        <input type='password' placeholder='Skriv lösenord...'></input>
        <button type='submit'>Registrera dig</button>
      </form>
      
    </div>
  )
}


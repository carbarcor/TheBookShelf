import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/signup'>Register</Link>
      <Link to='/login'>Login</Link>
      <Link to='/mybooks'>Mina böcker</Link>
    </nav>
  )
}

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Shelf/userShelf'; // Se till att sökvägen är korrekt

export default function Dashboard() {
  const { user } = useContext(UserContext);// Hämta användardata från UserContext
  const [searchQuery, setSearchQuery] = useState('');// Tillstånd för sökfråga
  const [author, setAuthor] = useState('');// Tillstånd för författare
  const [title, setTitle] = useState('');// Tillstånd för boktitel
  const [isbn, setIsbn] = useState('');// Tillstånd för ISBN
  const [books, setBooks] = useState([]);// Tillstånd för böcker

  // Funktion för att hantera sökningen
  const handleSearch = async (e) => {
    e.preventDefault();// Förhindra standardformulärets skickande
    try {
      // Skicka GET-förfrågan till backend med sökparametrar
      const response = await axios.get('http://localhost:8000/search', {
        params: {
          q: searchQuery,
          author,
          title,
          isbn,
          limit: 5 // Begränsa resultaten till 5
        }
      });
      setBooks(response.data.docs);// Uppdatera tillståndet med de hämtade böckerna
    } catch (error) {
      console.error('Error fetching books:', error);// Logga eventuella fel
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {user && ( // Visa användarens namn och ID om användaren är inloggad
        <div>
          <p>Welcome, {user.name}, ID user: {user.id}!</p>
        </div>
      )}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for books..."// Sökfält för böcker
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author name..."// Sökfält för författare
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book title..."// Sökfält för boktitel
        />
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN..." // Sökfält för ISBN
        />
        <button type="submit">Search</button> // Sökningsknapp
      </form>
      <div>
        {books.length > 0 && ( // Visa resultaten om det finns några böcker
          <ul>
            {books.map((book) => ( // Loop genom varje bok och visa dess information
              <li key={book.key}>
                <h3>
                  <Link to={`/book/${book.key.replace('/works/', '')}`}>{book.title}</Link> // Länk till bokens sidan
                </h3>
                <p>Author: {book.author_name ? book.author_name.join(', ') : 'N/A'}</p> // Visa författarens namn
                <p>First published: {book.first_publish_year}</p> // Visa publiceringsåret
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

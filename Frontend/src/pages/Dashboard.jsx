import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Shelf/userShelf'; // Se till att sökvägen är korrekt
import '../styles/dashboard.css'; // Importerar CSS-fil.

export default function Dashboard() {
  const { user } = useContext(UserContext);// Hämta användardata från UserContext
  const [searchQuery, setSearchQuery] = useState('');// Tillstånd för sökfråga
  const [author, setAuthor] = useState('');// Tillstånd för författare
  const [title, setTitle] = useState('');// Tillstånd för boktitel
  const [isbn, setIsbn] = useState('');// Tillstånd för ISBN
  const [books, setBooks] = useState([]);// Tillstånd för böcker
  const [showAdvanced, setShowAdvanced] = useState(false); // Tillstånd för att visa/dölja avancerade sökfält

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
    <div className="dashboard-container">
      <h1>Profil</h1>
      {user && (
        <div>
          <p>Välkommen, {user.name}, ID user: {user.id}!</p>
        </div>
      )}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Sök efter böcker..."
        />
        <button
          type="button"
          className="advanced-search-button"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          Avancerad sökning
        </button>
        {showAdvanced && (
          <div className="advanced-search-fields">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Författare..."
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titel..."
            />
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="ISBN..."
            />
          </div>
        )}
        <button type="submit">Sök</button>
      </form>
      <div className="bookResult">
        {books.length > 0 && (
          <ul>
            {books.map((book) => (
              <li key={book.key}>
                <h3>
                  <Link to={`/book/${book.key.replace('/works/', '')}`}>{book.title}</Link>
                </h3>
                <p>Författare: {book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
                <p>Publicerad: {book.first_publish_year}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

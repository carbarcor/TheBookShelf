import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Shelf/userShelf'; // Se till att sökvägen är korrekt
import '../styles/dashboard.css'; // Importerar CSS-fil.
import ErrorMessage from '../components/ErrorMessage'; // Importerar felmeddelanden

// Sida för visning av dashboard / sökningssida
export default function Dashboard() {
  const { user } = useContext(UserContext); // Hämta användardata från UserContext
  const [searchQuery, setSearchQuery] = useState(''); // Tillstånd för sökfråga
  const [author, setAuthor] = useState(''); // Tillstånd för författare
  const [title, setTitle] = useState(''); // Tillstånd för boktitel
  const [isbn, setIsbn] = useState(''); // Tillstånd för ISBN
  const [books, setBooks] = useState([]); // Tillstånd för böcker
  const [showAdvanced, setShowAdvanced] = useState(false); // Tillstånd för att visa/dölja avancerade sökfält
  const [searchError, setSearchError] = useState(''); // Tillstånd för felmeddelanden vid sökning
  const [hasSearchResults, setHasSearchResults] = useState(true); // Tillstånd för om sökresultat finns
  const navigate = useNavigate(); // Hook för att navigera mellan sidor

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
          limit: 10 // Begränsa resultaten till 10
        }
      });
      const searchResults = response.data.docs;
      setBooks(searchResults); 
      setHasSearchResults(searchResults.length > 0); // Uppdatera tillstånd baserat på sökresultat
    } catch (error) {
      console.error('Error fetching books:', error); // Logga eventuella fel
      setSearchError({
        status: error.response.status,
        statusText: error.response.statusText
      });
    }
  };

  // Spara bok som klickats på i localStorage
  const saveBookToLocalStorage = (book) => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const newBook = {
      id: book.key,
      title: book.title,
      cover_id: book.cover_id
    };
    savedBooks.push(newBook);
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
  };


  // Hanerting av klick för att spara i localStorage
  const handleBookClick = (book) => {
    saveBookToLocalStorage(book);
    navigate(`/book/${book.key.replace('/works/', '')}`);
  };

  // Rendera sök-sida
  return (
    <div className="dashboard-container">
      <h1>Biblioteket</h1>
      {user && (
        <div>
          <p>Välkommen, {user.name}!</p>
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
        <ErrorMessage error={searchError} />
        {!hasSearchResults && <p>Inget matchade din sökning.</p>}
        {books.length > 0 && (
          <ul>
            {books.map((book) => (
              <li key={book.key}>
                <h3>
                  <span
                    onClick={() => handleBookClick(book)}
                    style={{ cursor: 'pointer' }}
                  >
                    {book.title}
                  </span>
                </h3>
                <p>Författare: {book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
                <p>Utgiven: {book.first_publish_year}</p>
                {book.cover_id ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                    alt={`Cover of ${book.title}`}
                    onClick={() => handleBookClick(book)}
                    style={{ cursor: 'pointer'}}
                  />
                ) : (
                  <p>Inget omslag tillgängligt</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

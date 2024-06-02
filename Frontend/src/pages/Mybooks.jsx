import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/mybooks.css'; 

export default function Mybooks() {
  const [savedBooks, setSavedBooks] = useState([]);
  const navigate = useNavigate(); // För navigationen

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('savedBooks')) || [];
    setSavedBooks(books);
  }, []);

  const handleCardClick = (bookId) => {
    navigate(`/book/${bookId.replace('/works/', '')}`);
  };

  const handleDeleteBook = (bookId) => {
    const updatedBooks = savedBooks.filter(book => book.id !== bookId);
    setSavedBooks(updatedBooks);
    localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
  };

  const handleDeleteAll = () => {
    setSavedBooks([]);
    localStorage.removeItem('savedBooks');
  };

  return (
    <div className="books-box">
      <h1>Mina böcker</h1>
      <button className="delete-all-button" onClick={handleDeleteAll}>Radera alla böcker</button>
      <p>Här visas de böcker du har besökt.</p>
      <div className="books-container">
        {savedBooks.length > 0 ? (
          savedBooks.map((book, index) => (
            <div
              key={index}
              className="book-card"
              style={{
                backgroundImage: book.cover_id
                  ? `url(https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg)`
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleCardClick(book.id)}
            >
              <div className="book-card-content">
                <h3>{book.title}</h3>
              </div>
              <div className="delete-icon" onClick={() => handleDeleteBook(book.id)}>
                <img src="/src/img/bin.png" alt="Delete" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          ))
        ) : (
          <p>Inga böcker sparade.</p>
        )}
      </div>
    </div>
  );
}

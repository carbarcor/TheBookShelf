import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/mybooks.css'; 

export default function Mybooks() {
  const [savedBooks, setSavedBooks] = useState([]);
  const navigate = useNavigate(); // For navigationen

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('savedBooks')) || [];
    setSavedBooks(books);
  }, []);

  const handleCardClick = (bookId) => {
    navigate(`/book/${bookId.replace('/works/', '')}`);
  };

  return (
    <div>
      <h1>Mina böcker</h1>
      <p>Här visas de böcker du har sparat.</p>
      <div className="books-container">
        {savedBooks.length > 0 ? (
          savedBooks.map((book, index) => (
            <div
              key={index}
              className="book-card"
              onClick={() => handleCardClick(book.id)}
              style={{
                backgroundImage: book.cover_id
                  ? `url(https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg)`
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
              }}
            >
              <div className="book-card-content">
                <h3>{book.title}</h3>
                <p>ID: {book.id}</p>
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

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Shelf/userShelf';
import '../styles/BookDetails.css';
import ErrorMessage from '../components/ErrorMessage';
import FullStar from '../img/FullStar.png';

// Sida för visning av detaljerad bokinformation
export default function BookDetails() {
  const { bookId } = useParams();
  const { user } = useContext(UserContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [bookError, setBookError] = useState('');
  const [voteError, setVoteError] = useState('');
  const [deleteError, setDeleteError] = useState(''); 

  // Hämta bokdetaljer och recensioner
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/book/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setBookError({
          status: error.response.status,
          statusText: error.response.statusText
        });
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/reviews/${bookId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchBookDetails();
    fetchReviews();
  }, [bookId]);

  // Funktion för att länkar i beskrivning av bok i wrappas i ett span-element
  useEffect(() => {
    if (book && book.description) {
      const descElement = document.querySelector('.description');
      const description = typeof book.description === 'object' ? book.description.value : book.description;
  
      // Wrap länken i ett span-element med klassen "link"
      const updatedDescription = description.replace(/(https:\/\/[^\s]+)/g, '<span class="link">$1</span>');
      descElement.innerHTML = updatedDescription;
  
      // Ersätt innehållet i span-elementet med "(...)"
      const linkSpan = descElement.querySelector('.link');
      if (linkSpan) {
        linkSpan.textContent = "(...)";
      }
    }
  }, [book]);

  // Hantering av att skicka in en recension
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      console.error('User is not logged in or user ID is missing');
      return;
    }

    try {
      const response = await axios.post('/reviews', {
        bookId,
        review_text: reviewText,
        rating
      });
      setReviews([...reviews, response.data]);
      setReviewText('');
      setRating(1);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // Hantering av att rösta på en recension
  const handleVote = async (reviewId, type) => {
    if (!user || !user.id) {
      console.error('User is not logged in or user ID is missing');
      return;
    }

    try {
      console.log(`Sending ${type} request for reviewId: ${reviewId} from userId: ${user.id}`);
      const response = await axios.post(`/reviews/${reviewId}/${type}`, {
        userId: user.id
      });
      setReviews(reviews.map(review => review._id === reviewId ? response.data : review));
      setVoteError('');
    } catch (error) {
      console.error(`Error ${type}ing review:`, error);
      if (error.response && error.response.data) {
        setVoteError(error.response.data.error);
      } else {
        setVoteError('An error occurred');
      }
    }
  };

  // Hantering av att ta bort en recension
  const handleDelete = async (reviewId) => {
    if (!user || !user.id) {
      console.error('User is not logged in or user ID is missing');
      return;
    }

    try {
      console.log(`Sending delete request for reviewId: ${reviewId} from userId: ${user.id}`);
      await axios.delete(`/reviews/${reviewId}`, {
        data: { userId: user.id }
      });
      setReviews(reviews.filter(review => review._id !== reviewId));
      setDeleteError(''); 
    } catch (error) {
      console.error(`Error deleting review:`, error);
      if (error.response && error.response.data) {
        setDeleteError(error.response.data.error);
      } else {
        setDeleteError('An error occurred');
      }
    }
  };

  // Rendera betygsstjärnor
  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[...Array(rating)].map((_, index) => (
          <img key={index} src={FullStar} alt="star" className="star" />
        ))}
      </div>
    );
  };

  // Rendera laddningssida och felmeddelande om detaljerad info om bok ej finns tillgängliga
  if (!book) {
    return (
      <div className="loading">
        <div className="loader"></div>
        <ErrorMessage error={bookError} />
      </div>
    );
  }

  //Felhantering för tomma bok-sidor. Kontrollerar om book.description är ett objekt och använder dess value-fält, annars används den direkt.
  const description = typeof book.description === 'object' ? book.description.value : book.description;

  // Rendering av detaljerad bokinformation och recensioner
  return (
    <div className="book-details-container">
      <h1>{book.title}</h1>
      <ErrorMessage error={bookError} />

      {book.cover_id ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
          alt={`Cover of ${book.title}`}
        />
        ) : (
          <p>Inget omslag tillgängligt</p>
        )}

      <p className="author">Författare: {book.author_names.length > 0 ? book.author_names.join(', ') : 'N/A'}</p>
      <p className="publish-year">Utgiven: {book.first_published_year || 'N/A'}</p>
      
      <p className="description">{description || 'Ingen beskrivning tillgänglig.'}</p>
      
      <h2>Lämna en recension</h2>
      {user ? (
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Skriv din recension här..."
            maxLength="250"
          />
          <p>Välj betyg</p>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <button type="submit">Lämna recension</button>
        </form>
      ) : (
        <p>Vänligen logga in för att lämna en recension.</p>
      )}
      
      <h2>Recensioner</h2>
      {voteError && <p className="error">{voteError}</p>}
      {deleteError && <p className="error">{deleteError}</p>}
      <div className="reviews-container">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div className="review" key={review._id}>
              <p>{review.review_text}</p>
              <div className="rating">Betyg: {renderStars(review.rating)}</div>
              <p>Av: {review.user.name}</p>
              <button onClick={() => handleVote(review._id, 'like')}>Gilla ({review.likes.length})</button>
              <button onClick={() => handleVote(review._id, 'dislike')}>Ogilla ({review.dislikes.length})</button>
              {user && user.id === review.user._id && (
                <button onClick={() => handleDelete(review._id)}>Ta bort recension</button>
              )}
            </div>
          ))
        ) : (
          <p>Recensioner saknas.</p>
        )}
      </div>
    </div>
  );
}
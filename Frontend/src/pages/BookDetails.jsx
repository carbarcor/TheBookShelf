import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Shelf/userShelf';
import '../styles/BookDetails.css';
import ErrorMessage from '../components/ErrorMessage';
import FullStar from '../img/FullStar.png';

export default function BookDetails() {
  const { bookId } = useParams();
  const { user } = useContext(UserContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [bookError, setBookError] = useState('');
  const [voteError, setVoteError] = useState('');

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

  const handleVote = async (reviewId, type) => {
    if (!user || !user.id) {
      console.error('User is not logged in or user ID is missing');
      return;
    }

    try {
      const response = await axios.post(`/reviews/${reviewId}/${type}`, {
        userId: user.id
      });
      setReviews(reviews.map(review => review._id === reviewId ? response.data : review));
      setVoteError(''); // Reset the error message
    } catch (error) {
      console.error(`Error ${type}ing review:`, error);
      if (error.response && error.response.data) {
        setVoteError(error.response.data.error);
      } else {
        setVoteError('An error occurred');
      }
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[...Array(rating)].map((_, index) => (
          <img key={index} src={FullStar} alt="star" className="star" />
        ))}
      </div>
    );
  };

  if (!book) {
    return (
      <div>
        Loading...
        <ErrorMessage error={bookError} />
      </div>
    );
  }

  return (
    <div className="book-details-container">
      <h1>{book.title}</h1>
      <ErrorMessage error={bookError} />
      {book.cover_i && (
        <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt={book.title} />
      )}
      <p>Författare: {book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
      <p>Publicerad: {book.first_publish_year}</p>
      <p>ISBN: {book.isbn ? book.isbn.join(', ') : 'N/A'}</p>
      <p className="description">Description: {book.description || 'No description available'}</p>
      
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
        <p>Please log in to leave a review.</p>
      )}
      
      <h2>Recensioner</h2>
      {voteError && <p className="error">{voteError}</p>}
      <div className="reviews-container">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div className="review" key={review._id}>
              <p>{review.review_text}</p>
              <div className="rating">Betyg: {renderStars(review.rating)}</div>
              <p>Av: {review.user.name}</p>
              <button onClick={() => handleVote(review._id, 'like')}>Gilla ({review.likes.length})</button>
              <button onClick={() => handleVote(review._id, 'dislike')}>Ogilla ({review.dislikes.length})</button>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

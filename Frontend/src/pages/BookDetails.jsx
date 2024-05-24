import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Shelf/userShelf';
import '../styles/BookDetails.css'; // Justera sökvägen enligt din mappstruktur

export default function BookDetails() {
  const { bookId } = useParams();
  const { user } = useContext(UserContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/book/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
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

  const handleLike = async (reviewId) => {
    try {
      const response = await axios.post(`/reviews/${reviewId}/like`, {
        userId: user.id
      });
      setReviews(reviews.map(review => review._id === reviewId ? response.data : review));
    } catch (error) {
      console.error('Error liking review:', error);
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      const response = await axios.post(`/reviews/${reviewId}/dislike`, {
        userId: user.id
      });
      setReviews(reviews.map(review => review._id === reviewId ? response.data : review));
    } catch (error) {
      console.error('Error disliking review:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-details-container">
      <h1>{book.title}</h1>
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
      <div className="reviews-container">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div className="review" key={review._id}>
              <p>{review.review_text}</p>
              <p>Betyg: {review.rating}</p>
              <p>Av: {review.user.name}</p>
              <button onClick={() => handleLike(review._id)}>Gilla ({review.likes.length})</button>
              <button onClick={() => handleDislike(review._id)}>Ogilla ({review.dislikes.length})</button>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
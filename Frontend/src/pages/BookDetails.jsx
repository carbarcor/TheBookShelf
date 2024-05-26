import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Shelf/userShelf';// Importerar UserContext för att hämta användarinformation
import ErrorMessage from '../components/ErrorMessage'; // Importerar felmeddelanden

export default function BookDetails() {
  const { bookId } = useParams();// Hämta bookId från URL-parametrarna
  const { user } = useContext(UserContext);// Hämta användarinformation från UserContext
  const [book, setBook] = useState(null);// Tillstånd för att lagra bokinformationen
  const [reviews, setReviews] = useState([]);// Tillstånd för att lagra recensioner
  const [reviewText, setReviewText] = useState('');// Tillstånd för att lagra texten av en ny recension
  const [rating, setRating] = useState(1);// Tillstånd för att lagra betyget av en ny recension
  const [bookError, setBookError] = useState(''); // State for book fetch error
  

  // useEffect för att hämta bokinformation och recensioner när komponenten laddas eller när bookId ändras
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log(`Fetching book details for bookId: ${bookId}`);
        const response = await axios.get(`/book/${bookId}`);// Hämta bokinformationen från backend
        console.log('Book details response:', response.data);
        setBook(response.data);// Sätta bokinformationen i tillståndet
      } catch (error) {
        console.error('Error fetching book details:', error);// Logga eventuella fel
        setBookError({
          status: error.response.status,
          statusText: error.response.statusText
        });
      }
    };

    const fetchReviews = async () => {
      try {
        console.log(`Fetching reviews for bookId: ${bookId}`);
        const response = await axios.get(`/reviews/${bookId}`);// Hämta recensionerna från backend
        console.log('Reviews response:', response.data);
        setReviews(response.data); // Sätta recensionerna i tillståndet
      } catch (error) {
        console.error('Error fetching reviews:', error);// Logga eventuella fel
      }
    };

    fetchBookDetails();
    fetchReviews();
  }, [bookId]);

  // Funktion för att hantera inlämning av en ny recension
  const handleReviewSubmit = async (e) => {
    e.preventDefault();// Förhindra standardformulärets skickande
    if (!user || !user.id) {
      console.error('User is not logged in or user ID is missing');// Logga ett fel om användaren inte är inloggad
      return;
    }

    try {
      const response = await axios.post('/reviews', {
        bookId,
        review_text: reviewText,
        rating
      });
      setReviews([...reviews, response.data]);// Lägg till den nya recensionen i tillståndet
      setReviewText('');// Rensa textfältet
      setRating(1);// Återställ betyget
    } catch (error) {
      console.error('Error submitting review:', error);// Logga eventuella fel
    }
  };

  // Funktion för att hantera gillning av en recension
  const handleLike = async (reviewId) => {
    try {
      const response = await axios.post(`/reviews/${reviewId}/like`, {
        userId: user.id
      });
      setReviews(reviews.map(review => review._id === reviewId ? response.data : review));// Uppdatera recensionen i tillståndet
    } catch (error) {
      console.error('Error liking review:', error);// Logga eventuella fel
    }
  };

   // Funktion för att hantera ogillning av en recension
  const handleDislike = async (reviewId) => {
    try {
      const response = await axios.post(`/reviews/${reviewId}/dislike`, {
        userId: user.id
      });
      setReviews(reviews.map(review => review._id === reviewId ? response.data : review));// Uppdatera recensionen i tillståndet
    } catch (error) {
      console.error('Error disliking review:', error);// Logga eventuella fel
    }
  };

  // Om bokinformationen inte har laddats än, visa en laddningsmeddelande
  if (!book) {
    return (
        <div>
          Loading...
          <ErrorMessage error={bookError} />
        </div>
      );
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <ErrorMessage error={bookError} />
      {book.cover_id ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
          alt={`Cover of ${book.title}`}
        />
        ) : (
        <p>No cover available</p>
        )}
      <p>Author: {book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
      <p>First published: {book.first_publish_year}</p> 
      <p>ISBN: {book.isbn ? book.isbn.join(', ') : 'N/A'}</p> 
      <p>Description: {book.description || 'No description available'}</p>
      
      <h2>Leave a Review</h2>
      {user ? ( 
        <form onSubmit={handleReviewSubmit}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            maxLength="250"
          />
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <button type="submit">Submit Review</button>
        </form>
      ) : (
        <p>Please log in to leave a review.</p> 
      )}
      
      <h2>Reviews</h2>
      {reviews.length > 0 ? ( 
        reviews.map(review => (
          <div key={review._id}>
            <p>{review.review_text}</p>
            <p>Rating: {review.rating}</p>
            <p>By: {review.user.name}</p>
            <button onClick={() => handleLike(review._id)}>Like ({review.likes.length})</button>
            <button onClick={() => handleDislike(review._id)}>Dislike ({review.dislikes.length})</button>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p> 
      )}
    </div>
  );
}

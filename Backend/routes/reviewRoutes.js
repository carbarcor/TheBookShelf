const express = require('express');
const Review = require('../models/Review'); // Importerar Review-modellen
const authenticateToken = require('../middleware/auth');// Importerar middleware för autentisering
const router = express.Router(); // Skapar en ny router för att hantera recensioner
const { likeReview, dislikeReview } = require('../controllers/reviewController');

// Route för att lägga till en ny recension
router.post('/reviews', authenticateToken, async (req, res) => {
  const { bookId, review_text, rating } = req.body;// Destrukturera body-parametrarna från förfrågan
  const userId = req.user.id; // Destrukturera body-parametrarna från förfrågan

  console.log('Received review data:', { userId, bookId, review_text, rating });

  try {
    // Kontrollera att användar-ID finns
    if (!userId) {
      throw new Error('User ID is required');
    }
    // Kontrollera att bok-ID finns
    if (!bookId) {
      throw new Error('Book ID is required');
    }
    // Kontrollera att betyg finns och är mellan 1 och 5
    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    // Skapa en ny recension med mottagna data
    const review = new Review({
      user: userId,
      book: bookId,
      review_text,
      rating
    });

     // Spara recensionen i databasen
    await review.save();
    res.status(201).json(review); // Skicka tillbaka den skapade recensionen med status 201
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: error.message }); // Skicka ett felmeddelande om något går fel
  }
});

// Hämta alla recensioner för en bok
router.get('/reviews/:bookId', async (req, res) => {
  const { bookId } = req.params; // Hämta bok-ID från URL-parametrarna

  try {
    // Hitta alla recensioner för en specifik bok och populera användarfältet med användarens namn
    const reviews = await Review.find({ book: bookId }).populate('user', 'name');
    if (!reviews) {
      return res.status(404).json({ error: 'No reviews found' }); // Skicka ett felmeddelande om inga recensioner hittades
    }
    res.json(reviews); // Skicka tillbaka recensionerna
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Error fetching reviews' }); // Skicka ett felmeddelande om något går fel
  }
});

// Route för att gilla en recension
router.post('/reviews/:reviewId/like', async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  console.log(`Received like request for reviewId: ${reviewId} from userId: ${userId}`);

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Ta bort ogillning om användaren tidigare ogillat recensionen
    if (review.dislikes.includes(userId)) {
      review.dislikes.pull(userId);
    }

    // Ta bort gillning om användaren redan har gillat recensionen, annars addera gillning
    if (review.likes.includes(userId)) {
      review.likes.pull(userId);
    } else {
      review.likes.push(userId);
    }

    await review.save();

    res.json(review);
  } catch (error) {
    console.error('Error liking review:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route för att ogilla recension
router.post('/reviews/:reviewId/dislike', async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  console.log(`Received dislike request for reviewId: ${reviewId} from userId: ${userId}`);

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Ta bort gillning om användaren redan gillat recensionen
    if (review.likes.includes(userId)) {
      review.likes.pull(userId);
    }

    // Ta bort ogillning om användaren redan ogillat recensionen, annars addera ogillning
    if (review.dislikes.includes(userId)) {
      review.dislikes.pull(userId);
    } else {
      review.dislikes.push(userId);
    }

    await review.save();

    res.json(review);
  } catch (error) {
    console.error('Error disliking review:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route för att ta bort recension
router.delete('/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  console.log(`Received delete request for reviewId: ${reviewId} from userId: ${userId}`);

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Kontrollera att användaren är auktoriserad till att ta bort recension
    if (review.user.toString() !== userId) {
      return res.status(403).json({ error: 'You can only delete your own reviews' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; // Exporterar routern så att den kan användas i andra delar av applikationen
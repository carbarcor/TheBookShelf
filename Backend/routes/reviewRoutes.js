const express = require('express');
const Review = require('../models/Review'); // Importerar Review-modellen
const authenticateToken = require('../middleware/auth');// Importerar middleware för autentisering
const router = express.Router();// Skapar en ny router för att hantera recensioner

// Aggiungere una nuova recensione
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
    res.status(201).json(review);// Skicka tillbaka den skapade recensionen med status 201
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: error.message });// Skicka ett felmeddelande om något går fel
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
    res.status(500).json({ error: 'Error fetching reviews' });// Skicka ett felmeddelande om något går fel
  }
});

module.exports = router; // Exporterar routern så att den kan användas i andra delar av applikationen

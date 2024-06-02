// reviewController.js
const Review = require('../models/Review');
const User = require('../models/User');

// Funktion för gillande av recension
const likeReview = async (req, res) => {
  const { reviewId } = req.params; // Extrahera reviewId från request-parameter
  const { userId } = req.body; // Extrahera userId från request-body

  try {
    // Hitta recension utifrån dess Id
    const review = await Review.findById(reviewId);

    // Om recension inte finns, returnera 404 error
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Kontrollera om användaren redan har gillat eller ogillat recension
    if (review.likes.includes(userId) || review.dislikes.includes(userId)) {
      return res.status(400).json({ error: 'User has already voted' });
    }

    // Lägg till userId i likes-array och spara uppdaterad recension
    review.likes.push(userId);
    await review.save();

    // Returnera uppdaterad recension som en respons
    res.json(review);

  } catch (error) {
    console.error('Error liking review:', error);
    // Returnera statuskod 500 vid serverfel
    res.status(500).json({ error: 'Server error' });
  }
};

// Funktion för ogillande av recension
const dislikeReview = async (req, res) => {
  const { reviewId } = req.params; // Extrahera reviewId från request-parameter
  const { userId } = req.body; // Extrahera userId från request-body

  try {
    // Hitta recension utifrån dess Id
    const review = await Review.findById(reviewId);

    // Om recension inte finns, returnera 404 error
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Kontrollera om användaren redan har gillat eller ogillat recension
    if (review.likes.includes(userId) || review.dislikes.includes(userId)) {
      return res.status(400).json({ error: 'User has already voted' });
    }

    // Lägg till userId i dislikes-array och spara uppdaterad recension
    review.dislikes.push(userId);
    await review.save();

    // Returnera uppdaterad recension som en respons
    res.json(review);
  } catch (error) {
    console.error('Error disliking review:', error);
    // Returnera statuskod 500 vid serverfel
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { likeReview, dislikeReview }; // Exportera funktionen
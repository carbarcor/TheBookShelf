// reviewController.js
const Review = require('../models/Review');
const User = require('../models/User');

const likeReview = async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.likes.includes(userId) || review.dislikes.includes(userId)) {
      return res.status(400).json({ error: 'User has already voted' });
    }

    review.likes.push(userId);
    await review.save();

    res.json(review);
  } catch (error) {
    console.error('Error liking review:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const dislikeReview = async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.likes.includes(userId) || review.dislikes.includes(userId)) {
      return res.status(400).json({ error: 'User has already voted' });
    }

    review.dislikes.push(userId);
    await review.save();

    res.json(review);
  } catch (error) {
    console.error('Error disliking review:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { likeReview, dislikeReview };

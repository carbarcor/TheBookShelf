// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: String, ref: 'Book', required: true },
  review_text: { type: String, maxlength: 250 },
  rating: { type: Number, min: 1, max: 5, required: true },
});

module.exports = mongoose.model('Review', reviewSchema);

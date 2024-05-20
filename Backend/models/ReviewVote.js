// models/ReviewVote.js
const mongoose = require('mongoose');

const reviewVoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true },
  vote: { type: String, enum: ['upvote', 'downvote'], required: true },
});

reviewVoteSchema.index({ user: 1, review: 1 }, { unique: true });

module.exports = mongoose.model('ReviewVote', reviewVoteSchema);

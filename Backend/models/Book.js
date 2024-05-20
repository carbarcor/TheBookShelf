// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String },
});

module.exports = mongoose.model('Book', bookSchema);

const mongoose = require('mongoose');// Importerar mongoose för att skapa och hantera MongoDB-scheman

// Definierar schemat för en recension
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },// Referens till användaren som skapade recensionen, obligatoriskt fält
  book: { type: String, ref: 'Book', required: true }, // Referens till boken som recensionen gäller, obligatoriskt fält
  review_text: { type: String, maxlength: 250 },// Texten i recensionen, maxlängd 250 tecken
  rating: { type: Number, min: 1, max: 5, required: true },// Betyget som användaren ger boken, måste vara mellan 1 och 5, obligatoriskt fält
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],// Array av användar-ID:n som har gillat recensionen
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array av användar-ID:n som har ogillat recensionen
});

// Exporterar modellen baserat på reviewSchema
module.exports = mongoose.model('Review', reviewSchema);

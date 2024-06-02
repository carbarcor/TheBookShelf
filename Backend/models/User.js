// models/User.js
const mongoose = require('mongoose');

// Definierar schemat för en användare
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Exporterar modellen baserat på userSchema
module.exports = mongoose.model('User', userSchema);
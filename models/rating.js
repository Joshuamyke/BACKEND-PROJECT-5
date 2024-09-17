// models/rating.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
   rating: { type: Number, required: true }
});

module.exports = mongoose.model('Rating', ratingSchema);
// services/favoriteService.js
const Favorite = require('../models/favorite');
const Rating = require('../models/rating');

async function addFavorite(userId, recipeId) {
   const favorite = new Favorite({ userId, recipeId });
   await favorite.save();
   return favorite;
}

async function removeFavorite(userId, recipeId) {
   await Favorite.findOneAndRemove({ userId, recipeId });
}

async function submitRating(userId, recipeId, rating) {
   const ratingDoc = await Rating.findOne({ userId, recipeId });
   if (ratingDoc) {
      ratingDoc.rating = rating;
      await ratingDoc.save();
   } else {
      const rating = new Rating({ userId, recipeId, rating });
      await rating.save();
   }
   return rating;
}

module.exports = { addFavorite, removeFavorite, submitRating };
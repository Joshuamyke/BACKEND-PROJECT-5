// ROUTE CRUD FAVORITE 
const express = require('express');
const router = express.Router();
const favoriteService = require('../services/favoriteService');

router.post('/:recipeId', async (req, res) => {
  try {
    const favorite = await favoriteService.addFavorite(req.user._id, req.params.recipeId);
   return res.status(201).json({ message: 'Recipe added to favorites' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete('/:recipeId', async (req, res) => {
  try {
    await favoriteService.removeFavorite(req.user._id, req.params.recipeId);
  return  res.status(200).json({ message: 'Recipe removed from favorites' });
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
});

router.post('/rating/:recipeId', async (req, res) => {
  try {
    const rating = await favoriteService.submitRating(req.user._id, req.params.recipeId, req.body.rating);
    res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


router.get('/:recipeId', async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ userId: req.user._id, recipeId: req.params.recipeId });
    if (favorite) {
    return  res.status(200).json({ message: 'Recipe is in favorites' });
    } else {
    return  res.status(404).json({ message: 'Recipe is not in favorites' });
    }
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
});

router.get('/rating/:recipeId', async (req, res) => {
  try {
    const rating = await Rating.findOne({ userId: req.user._id, recipeId: req.params.recipeId });
    if (rating) {
    return  res.status(200).json({ rating: rating.rating });
    } else {
    return  res.status(404).json({ message: 'No rating found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// SEARCH ROUTE
router.get('/search', async (req, res) => {
   try {
      const query = req.query.q;
      const recipes = await Recipe.find({ $text: { $search: query } });
    return  res.status(200).json(recipes);
   } catch (error) {
     return res.status(500).json({ message: error.message });
   }
});

// ROUTE SKIP AND LIMIT METHOD
router.get('/', async (req, res) => {
   try {
      const limit = req.query.limit || 10;
      const skip = req.query.skip || 0;
      const recipes = await Recipe.find().skip(skip).limit(limit);
     return res.status(200).json(recipes);
   } catch (error) {
    return  res.status(500).json({ message: error.message });
   }
});
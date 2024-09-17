const Favorite = require('../models/favorite');

exports.createFavorite = async (req, res) => {
   try {
      const favorite = new Favorite(req.body);
      await favorite.save();
      res.status(201).json({ message: 'Favorite created successfully' });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};

exports.getFavorite = async (req, res) => {
   try {
      const favorite = await Favorite.findOne({ userId: req.user._id, recipeId: req.params.recipeId });
      if (favorite) {
         res.status(200).json({ message: 'Recipe is in favorites' });
      } else {
         res.status(404).json({ message: 'Recipe is not in favorites' });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

exports.deleteFavorite = async (req, res) => {
   try {
      await Favorite.findOneAndRemove({ userId: req.user._id, recipeId: req.params.recipeId });
      res.status(200).json({ message: 'Favorite deleted successfully' });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};
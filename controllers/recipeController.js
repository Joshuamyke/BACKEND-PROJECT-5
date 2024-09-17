const Recipe = require('../models/recipe');

exports.createRecipe = async (req, res) => {
   try {
      const recipe = new Recipe(req.body);
      await recipe.save();
    return  res.status(201).json({ message: 'Recipe created successfully' });
   } catch (error) {
     return res.status(400).json({ message: error.message });
   }
};

exports.getRecipe = async (req, res) => {
   try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      } else {
       return  res.status(200).json(recipe);
      }
   } catch (error) {
   return   res.status(500).json({ message: error.message });
   }
};

exports.updateRecipe = async (req, res) => {
   try {
      const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ message: 'Recipe updated successfully' });
   } catch (error) {
     return res.status(400).json({ message: error.message });
   }
};

exports.deleteRecipe = async (req, res) => {
   try {
      await Recipe.findByIdAndRemove(req.params.id);
    return  res.status(200).json({ message: 'Recipe deleted successfully' });
   } catch (error) {
   return res.status(400).json({ message: error.message });
   }
};
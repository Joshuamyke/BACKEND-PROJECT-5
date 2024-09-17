// RECIPE ROUTE
const express = require('express');
const router = express.Router();
const recipeService = require('../services/recipeService');

router.post('/', authenticate, async  (req, res) => {
  try {
    const recipe = await recipeService.createRecipe(req.body.title, req.body.ingredients, req.body.instructions, req.user._id, req.body.categories);
   return res.status(201).json({ message: 'Recipe created successfully' });
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const recipes = await recipeService.getRecipes();
   return res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id',authenticate, async (req, res) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) {
    return  res.status(404).json({ message: 'Recipe not found' });
    } else {
      res.status(200).json(recipe);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const recipe = await recipeService.updateRecipe(req.params.id, req.body.title, req.body.ingredients, req.body.instructions, req.body.categories);
   return res.status(200).json({ message: 'Recipe updated successfully' });
  } catch (error) {
return    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await recipeService.deleteRecipe(req.params.id);
   return res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
  return  res.status(500).json({ message: error.message });
  }
});




router.get('/categories/:category', authenticate, async (req, res) => {
            try {
               const recipes = await Recipe.find({ categories: req.params.category });
               return res.status(200).json(recipes);
            } catch (error) {
           return    res.status(500).json({message: error.message});}});
               router.get('/ingredients/:ingredient', async (req, res) => {
   try {
      const recipes = await Recipe.find({ ingredients: req.params.ingredient });
     return res.status(200).json(recipes);
   } catch (error) {
   return   res.status(500).json({ message: error.message });
   }
});

router.get('/user/:userId', authenticate, async (req, res) => {
   try {
      const recipes = await Recipe.find({ author: req.params.userId });
     return res.status(200).json(recipes);
   } catch (error) {
    return  res.status(500).json({ message: error.message });
   }
});

module.exports = router;
// services/recipeService.js
const Recipe = require('../models/recipe');

async function createRecipe(title, ingredients, instructions, author, categories) {
   const recipe = new Recipe({ title, ingredients, instructions, author, categories });
   await recipe.save();
   return recipe;
}

async function getRecipes() {
   return await Recipe.find().populate('author');
}

async function getRecipeById(id) {
   return await Recipe.findById(id).populate('author');
}

async function updateRecipe(id, title, ingredients, instructions, categories) {
   const recipe = await Recipe.findById(id);
   if (!recipe) {
      throw new Error('Recipe not found');
   }
   recipe.title = title;
   recipe.ingredients = ingredients;
   recipe.instructions = instructions;
   recipe.categories = categories;
   await recipe.save();
   return recipe;
}

async function deleteRecipe(id) {
   await Recipe.findByIdAndRemove(id);
}

module.exports = { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe };
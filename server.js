const express = require('express');
const db = require('./db');

const server = express();
server.use(express.json());

server.get('/api/dishes', async (req, res) => {
  const payload = await db('dishes');
  res.status(200).json(payload);
});
server.get('/api/dishes/:id', async (req, res) => {
  const { id } = req.params;
  const payload = await db('dishes').where('id', id);
  res.status(200).json(payload[0]);
});
server.get('/api/recipes', async (req, res) => {
  const payload = await db('recipes')
    .leftJoin('dishes', 'recipes.dishId', '=', 'dishes.id')
    .select(db.ref('recipes.name').as('Recipe'), db.ref('dishes.name').as('Dish'));
  res.status(200).json(payload);
});
server.get('/api/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const recipePromise = db('recipes')
    .where('recipes.id', '=', id)
    .leftJoin('dishes', 'recipes.dishId', '=', 'dishes.id')
    .select(db.ref('recipes.name').as('recipeName'), db.ref('dishes.name').as('dishName'));
  const ingredientsPromise = db('ingredients').where('recipeId', '=', id);
  const stepsPromise = db('steps').where('recipeId', '=', id).orderBy('stepNumber');
  const dataLump = await Promise.all([recipePromise, ingredientsPromise, stepsPromise]);
  const [[recipe], ingredients, steps] = dataLump;
  const payload = {
    ...recipe,
    ingredients,
    steps: steps.map(item => ({ stepNumber: item.stepNumber, description: item.description })),
  };
  res.status(200).json(payload);
});

server.use((err, req, res, next) => {
  res.status(500).json(err);
  next();
});

server.listen(8000, () => {
  console.log('Listening on 8000');
});

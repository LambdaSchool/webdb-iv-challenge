const config = require('./knexfile.js')['development'];
const knex = require('knex')(config)
const express = require('express');
const port = 5555;
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')


server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

server.get('/', (req, res) => {
	res.send('API is working')
})

//should return a list of all dishes in the database.
server.get('/dishes', (req, res) => {
	knex.raw(`select * from dishes`)
		.then(response => {
			console.log(response)
			res.status(200).json(response);
		})
})

//should return the dish with the provided id and include a list of the related recipes
server.get('/dishes/:id', (req, res) => {
	const id = req.params.id
	knex.raw(`
			SELECT dishes.dish_name, recipes.recipe_name
			FROM dishes
			INNER JOIN recipes
			ON dishes.id=recipes.dish_id
			where recipes.dish_id = ${id}
		`)
	.then(response => {
		console.log(response)
		res.status(200).json(response)
	})
})

// should return a list of all recipes in the database including the dish they belong to
server.get('/recipes', (req, res) => {
	knex.raw(`
		SELECT dishes.dish_name, recipes.recipe_name
		FROM dishes
		INNER JOIN recipes
		ON dishes.id=recipes.dish_id
	`)
	.then(response => {
		console.log(response)
		res.status(200).json(response)
	})
})

/* add a method called getRecipe(id) to your data access library that 
should return the recipe with the provided id. The recipe should include:
name of the dish.
name of the recipe.
the list of ingredients with the quantity. */

server.get('/recipes/:id', (req, res) => {
	id = req.params.id
	knex.raw(`
		select dishes.dish_name, recipes.id, recipes.recipe_name, recipes.directions, recipe_ingredients.amount, ingredients.ingredient_name
		from dishes
		inner join recipes on recipes.dish_id=dishes.id
		inner join recipe_ingredients on recipe_ingredients.recipes_id=recipes.id
		inner join ingredients on recipe_ingredients.ingredient_id=ingredients.id
		where recipes.id = ${id} 
	`)
	.then(response => {
		console.log(response)
		res.status(200).json(response);
	})
})

//addDish(dish): should add the dish to the database and return the id of the new dish.
server.post('/dishes/', (req, res) => {
	knex.insert(req.body).into('dishes')
	.then(response => {
		console.log(response)
		res.status(201).json(response);
	})
})

//addRecipe(recipe): should add a recipe to the database and return the id of the new recipe.
server.post('/recipes', (req, res) => {
	knex.insert(req.body).into('recipes')
	.then(response => {
		console.log(response)
		res.status(201).json(response)
	})
})


server.listen(port, () => console.log(`server running on port 5555`));













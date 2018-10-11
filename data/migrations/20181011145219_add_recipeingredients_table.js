
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipeingredients', function(tbl) {
    tbl.increments();
    tbl
      .integer('ingredient_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('ingredients')
    tbl
      .integer('recipe_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('recipes')
    tbl
      .float('quantity')
      .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipeingredients');
};

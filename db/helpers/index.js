const knex = require("knex");
const dbConfig = require("../../knexfile");
const db = knex(dbConfig.development);

module.exports = {
  getDishes: function(id) {
    let query = db("dishes");

    if (id) {
      return query
        .where("id", id)
        .first()
        .then(dish => dish);
    } else {
      return query.then(dishes => dishes);
    }
  },

  getIngredients: function(id) {
    let query = db("ingredients");

    if (id) {
      return query
        .where("id", id)
        .first()
        .then(ingredient => ingredient);
    } else {
      return query.then(ingredients => ingredients);
    }
  },

  addDish: function(dish) {
    return db("dishes")
      .insert(dish)
      .then(id => this.getDishes(id));
  }
};

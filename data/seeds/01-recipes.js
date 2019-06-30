
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {recipe: 'Hawaiian'},
        {recipe: 'Fish'},
        {recipe: 'Steak'}
      ]);
    });
};

exports.up = function(knex, Promise) {
    return knex.schema.createTable('ingredients', (tbl) => {
        tbl.increments();
        tbl.string('name').unique().notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('ingredients');
};

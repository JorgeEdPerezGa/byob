
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('counties', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('organisms', function(table) {
      table.increments('id').primary();
      table.string('scientific-name');
      table.string('common-name');
      table.string('taxonomic-group');
      table.string('federal-extinction');
    }),
    knex.schema.createTable('counties_organisms', function(table) {
      table.increments('id').primary();
      table.integer('counties_id').references('counties.id');
      table.integer('organisms_id').references('organisms.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('counties_organisms');
    knex.schema.dropTable('counties');
    knex.schema.dropTable('organisms');
  ]);
};
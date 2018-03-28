
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('counties', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('county_pop_2015');
      table.string('county_area');
    }),
    knex.schema.createTable('organisms', function(table) {
      table.increments('id').primary();
      table.integer('county_id').unsigned()
        .references('counties.id');
      table.string('scientific_name');
      table.string('common_name');
      table.string('taxonomic_group');
      table.string('federal_extinction');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('organisms'),
    knex.schema.dropTable('counties')
  ]);
};

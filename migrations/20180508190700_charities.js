exports.up = function(knex, Promise) {

	return knex.schema.createTable('charities', (table) => {
		table.increments('id')
		table.varchar('charityInfo', 1000)
		table.varchar('info', 1000)
		table.varchar('linkTitle')
		table.varchar('title')
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('charities')
};

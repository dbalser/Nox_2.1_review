exports.up = function(knex, Promise) {

	return knex.schema.createTable('charities', (table) => {
		table.increments()
		table.varchar('charityInfo')
		table.varchar('info')
		table.varchar('linkTitle')
		table.varchar('title')
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('charities')
};

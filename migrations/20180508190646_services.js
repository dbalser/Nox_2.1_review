
exports.up = function(knex, Promise) {

	return knex.schema.createTable('services', (table) => {
		table.increments('id')
		table.varchar('title')
		table.varchar('description', 1000)
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('services')
};


exports.up = function(knex, Promise) {

	return knex.schema.createTable('services', (table) => {
		table.increments()
		table.varchar('title')
		table.varchar('description')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('services')
};

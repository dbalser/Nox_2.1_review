
exports.up = function(knex, Promise) {

	return knex.schema.createTable('users', (table) => {
		table.increments().onDelete("CASCAD")
		table.boolean('is_admin')
		table.varchar('name')
		table.varchar('uid')
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};

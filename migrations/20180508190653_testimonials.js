
exports.up = function(knex, Promise) {

	return knex.schema.createTable('testimonials', (table) => {
		table.increments()
		table.varchar('client_name')
		table.varchar('body_text')
		table.varchar('image_url')
		table.varchar('related_service')
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('testimonials')
};

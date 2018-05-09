
exports.up = function(knex, Promise) {

	return knex.schema.createTable('shopping_carts', (table) => {
		table.increments()
		table.foreign('product_id').references('id').on('products').onDelete('CASCADE')
		table.foreign('user_id').references('id').on('users').onDelete('CASCADE')
		table.integer('quantity')
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shopping _carts')
};

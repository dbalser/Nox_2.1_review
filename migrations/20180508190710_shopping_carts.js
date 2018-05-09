
exports.up = function(knex, Promise) {

	return knex.schema.createTable('shopping_carts', (table) => {
		table.increments('id')
		table.integer('product_id').references("id").inTable('products').onDelete('CASCADE').onUpdate('CASCADE')
		table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
		table.integer('quantity')
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shopping_carts')
};

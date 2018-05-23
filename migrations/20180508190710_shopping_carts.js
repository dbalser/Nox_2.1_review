
exports.up = function(knex, Promise) {

	return knex.schema.createTable('shopping_carts', (table) => {
		table.increments('id')
		table.integer('product_id').unsigned()
		table.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE')
		table.integer('user_id').unsigned()
		table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
		table.integer('quantity')
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shopping_carts')
};


exports.up = function(knex, Promise) {

	return knex.schema.createTable('orders', (table) => {
		table.increments()
		table.foreign('user_id').references('id').on('users').onDelete('CASCADE')
		table.varchar('cart')
		table.timestamp('paid_on')
		table.timestamp('shipped_on')
		table.varchar('shipping_address')
		table.integer('total')
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('orders')
};

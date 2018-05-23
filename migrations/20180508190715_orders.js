
exports.up = function(knex, Promise) {

	return knex.schema.createTable('orders', (table) => {
		table.increments('id')
		table.integer('user_id').unsigned()
		table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
		table.varchar('cart')
		table.timestamp('paid_on')
		table.timestamp('shipped_on')
		table.varchar('shipping_address')
		table.decimal('total', undefined, 2)
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('orders')
};

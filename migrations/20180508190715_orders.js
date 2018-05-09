
exports.up = function(knex, Promise) {

	return knex.schema.createTable('orders', (table) => {
		table.increments('id')
		table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
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

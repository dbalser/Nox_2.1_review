
exports.up = function(knex, Promise) {

	return knex.schema.createTable('products', (table) => {
		table.increments('id')
		table.varchar('gender')
		table.varchar('front_img')
		table.varchar('back_img')
		table.decimal('price', undefined, 2)
		table.varchar('design')
		table.varchar('size')
		table.integer('stock_quantity')
	})
};

exports.down = function(knex, Promise) {
  return knex.raw('DROP TABLE products CASCADE')
};

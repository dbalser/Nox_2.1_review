
exports.up = function(knex, Promise) {

	return knex.schema.createTable('products', (table) => {
		table.increments()
		table.varchar('gender')
		table.varchar('front_img')
		table.varchar('back_img')
		table.integer('price')
		table.varchar('design')
		table.varchar('size')
		table.integer('stock_quantity')
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('products')
};

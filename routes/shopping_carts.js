var express = require('express');
var router = express.Router();
const knex = require('../knex')

router.get('/', (req, res, next) => {

  knex('shopping_carts')
    .orderBy('id')
    .then((data) =>{
      res.send(data)
    })
})

router.get('/:userId', (req, res, next) => {

	const userId = req.params.userId

	knex('shopping_carts')
		.where('user_id', userId)
		.orderBy('id')
		.then((data) => {
			if(data.length === 0){
				res.send(data)
			}
			else {
				knex('products')
					.where('id',userId)
					.first()
					.then((product) => {
						data[0].product_id = product
						res.send(data)
					})
			}
		})
})

router.post('/', (req, res, next) => {

	const {product_id, user_id, quantity} = req.body
	const newData = {product_id, user_id, quantity}

   knex('shopping_carts')
   .insert(newData)
   .then(() => {
     res.send(newData);
   })
   .catch((err) => next(err));
})

router.patch('/:id', (req, res, next) => {

	const theId = req.params.id

	const {product_id, user_id, quantity} = req.body
	const newData = {product_id, user_id, quantity}

  knex('shopping_carts')
    .update(newData)
		.where("id", theId)
		.then(() => {

			knex('shopping_carts')
				.where('id', theId)
				.then((data) => {
					if(!data){
						res.sendStatus(404)
					}
					res.send(data)
				})
				.catch((err) => next(err));
	  })
})

router.delete('/:id', (req, res, next) => {

	const id = req.params.id

	knex('shopping_carts')
		.where('id', id)
		.first()
		.then((data) => {
			if(!data){
				res.sendStatus(404)
			}
			knex('shopping_carts')
				.del()
				.where('id', id)
				.then(() => {
					res.send(data)
				})
		})
})

module.exports = router;

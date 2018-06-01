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

				let newData = []

				data.forEach((d) => {

					knex('products')
						.where('id', d.product_id)
						.first()
						.then((product) => {

							d.product_id = product
							newData.push(d)

							if(newData.length === data.length) {
								res.send(newData)
							}
						})
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

router.delete('/:user_id', (req, res, next) => {

	const user_id = req.params.user_id
	let counter = 0
	
	knex('shopping_carts')
		.where('user_id', user_id)
		.then((data) => {
			if(!data){
				res.sendStatus(404)
			}
			data.forEach((d) => {

				knex('shopping_carts')
					.del()
					.where('id', d.id)
					.then(() => {
						counter += 1

						if (counter === data.length) {
							console.log(data);
							res.send(data)
						}
					})
			})
		})
})

module.exports = router;

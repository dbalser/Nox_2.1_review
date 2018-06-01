var express = require('express');
var router = express.Router();
const knex = require('../knex')

router.get('/', (req, res, next) => {

  knex('products')
    .orderBy('id')
    .then((products) =>{
      if(products.length < 1){
        res.sendStatus(404)
      }
      res.send(products)
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {

	const id = req.params.id

	knex('products')
		.where('id', id)
		.first()
		.then((product) => {
			if(product.length < 1){
				res.sendStatus(404)
			}
			res.send(product)
		})
})

router.post('/', (req, res, next) => {

	const {id, gender, front_img, back_img, price, design, size, stock_quantity} = req.body
	const newProduct = {id, gender, front_img, back_img, price, design, size, stock_quantity}

	newProduct.front_img = req.body.front_img //for some reason the front_img above isnt grabbing the front_img its getting...

   knex('products')
   .insert(newProduct)
   .then(() => {
     res.send(newProduct);
   })
   .catch((err) => next(err));
})

router.patch('/:id', (req, res, next) => {

	const theId = req.params.id

	const {id, gender, front_img, back_img, price, design, size, stock_quantity} = req.body

	const newProduct = {id, gender, front_img, back_img, price, design, size, stock_quantity}

  knex('products')
    .update(newProduct)
		.where("id", theId)
		.then(() => {

			knex('products')
				.where('id', theId)
				.then((product) => {
					if(!product){
						res.sendStatus(404)
					}
					res.send(product)
				})
				.catch((err) => next(err));
	  })
})

router.patch('/patchAll', (req, res, next) => {

	const subtractionInfo = [req.body.subArr]
	
	console.log(subtractionInfo);

  knex('products')
    .update(newProduct)
		.where("id", theId)
		.then(() => {

			knex('products')
				.where('id', theId)
				.then((product) => {
					if(!product){
						res.sendStatus(404)
					}
					res.send(product)
				})
				.catch((err) => next(err));
	  })
})

router.delete('/:id', (req, res, next) => {

	const id = req.params.id

	knex('products')
		.where('id', id)
		.first()
		.then((products) => {
			if(!products){
				res.sendStatus(404)
			}
			knex('products')
				.del()
				.where('id', id)
				.then(() => {
					res.send(products)
				})
		})
})

module.exports = router;

var express = require('express');
var router = express.Router();
const knex = require('../knex')

router.get('/', (req, res, next) => {

  knex('orders')
    .orderBy('id')
    .then((data) =>{
      if(data.length < 1){
        res.sendStatus(404)
      }
      res.send(data)
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {

	const id = req.params.id

	knex('orders')
		.where('id', id)
		.then((data) => {
			if(data.length < 1){
				res.sendStatus(404)
			}
			res.send(data)
		})
})

router.post('/', (req, res, next) => {

	const {user_id, cart, paid_on, shipped_on, shipping_address, total} = req.body
	const newData = {user_id, cart, paid_on, shipped_on, shipping_address, total}

   knex('orders')
   .insert(newData)
   .then(() => {
     res.send(newData);
   })
   .catch((err) => next(err));
})

router.patch('/:id', (req, res, next) => {

	const theId = req.params.id

	const {user_id, cart, paid_on, shipped_on, shipping_address, total} = req.body
	const newData = {user_id, cart, paid_on, shipped_on, shipping_address, total}

  knex('orders')
    .update(newData)
		.where("id", theId)
		.then(() => {

			knex('orders')
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

	knex('orders')
		.where('id', id)
		.first()
		.then((data) => {
			if(!data){
				res.sendStatus(404)
			}
			knex('orders')
				.del()
				.where('id', id)
				.then(() => {
					res.send(data)
				})
		})
})

module.exports = router;

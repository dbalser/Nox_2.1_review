var express = require('express');
var router = express.Router();
const knex = require('../knex')

router.get('/', (req, res, next) => {

  knex('services')
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

	knex('services')
		.where('id', id)
		.then((data) => {
			if(data.length < 1){
				res.sendStatus(404)
			}
			res.send(data)
		})
})

router.post('/', (req, res, next) => {

	const {description, title} = req.body
	const newData = {description, title}

   knex('services')
   .insert(newData)
   .then(() => {
     res.send(newData);
   })
   .catch((err) => next(err));
})

router.patch('/:id', (req, res, next) => {

	const theId = req.params.id

	const {description, title} = req.body
	const newData = {description, title}

  knex('services')
    .update(newData)
		.where("id", theId)
		.then(() => {

			knex('services')
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

	knex('services')
		.where('id', id)
		.first()
		.then((data) => {
			if(!data){
				res.sendStatus(404)
			}
			knex('services')
				.del()
				.where('id', id)
				.then(() => {
					res.send(data)
				})
		})
})

module.exports = router;

var express = require('express');
var router = express.Router();
const knex = require('../knex')

router.get('/', (req, res, next) => {
console.error("ddddd bug");
  knex('users')
    .orderBy('id')
    .then((data) =>{
      if(data.length < 1){
        res.sendStatus(404)
      }
      res.send(data)
    })
    .catch((err) => next(err))
})

router.get('/:uid', (req, res, next) => {

	const uid = req.params.uid

	knex('users')
		.where('uid', uid)
		.first()
		.then((data) => {
			if(data.length < 1){
				res.status(404)
				res.send(data)
			}
			res.send(data)
		})
		.catch((err) => next(err))
})

router.post('/', (req, res, next) => {

	const {is_admin, name, uid} = req.body
	const newData = {is_admin, name, uid}

   knex('users')
   .insert(newData)
   .then(() => {
     res.send(newData);
   })
   .catch((err) => next(err));
})

router.patch('/:id', (req, res, next) => {

	const theId = req.params.id

	const {is_admin, name, uid} = req.body
	const newData = {is_admin, name, uid}

  knex('users')
    .update(newData)
		.where("id", theId)
		.then(() => {

			knex('users')
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

	knex('users')
		.where('id', id)
		.first()
		.then((data) => {
			if(!data){
				res.sendStatus(404)
			}
			knex('users')
				.del()
				.where('id', id)
				.then(() => {
					res.send(data)
				})
		})
})

module.exports = router;

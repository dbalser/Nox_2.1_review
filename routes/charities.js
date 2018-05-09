var express = require('express');
var router = express.Router();
const knex = require('../knex')


router.get('/', (req, res, next) => {

  knex('charities')
    .orderBy('id')
    .then((charities) =>{
      if(charities.length < 1){
        res.sendStatus(404)
      }
      res.send(charities)
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {

	const id = req.params.id

	knex('charities')
		.where('id', id)
		.then((charity) => {
			if(charity.length < 1){
				res.sendStatus(404)
			}
			res.send(charity)
		})
})

router.post('/', (req, res, next) => {

	const {charityInfo, info, linkTitle, title} = req.body
	const newCharity = {charityInfo, info, linkTitle, title}

   knex('charities')
   .insert(newCharity)
   .then(() => {
     res.send(newCharity);
   })
   .catch((err) => next(err));
})

router.patch('/:id', (req, res, next) => {

	const theId = req.params.id

	const {charityInfo, info, linkTitle, title} = req.body
	const newCharity = {charityInfo, info, linkTitle, title}

  knex('charities')
    .update(newCharity)
		.where("id", theId)
		.then(() => {

			knex('charities')
				.where('id', theId)
				.then((charity) => {
					if(!charity){
						res.sendStatus(404)
					}
					res.send(charity)
				})
				.catch((err) => next(err));
	  })
})

router.delete('/:id', (req, res, next) => {

	const id = req.params.id

	knex('charities')
		.where('id', id)
		.first()
		.then((charities) => {
			if(!charities){
				res.sendStatus(404)
			}
			knex('charities')
				.del()
				.where('id', id)
				.then(() => {
					res.send(charities)
				})
		})
})


module.exports = router;

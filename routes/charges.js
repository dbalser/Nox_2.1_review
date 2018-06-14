var express = require('express')
var router = express.Router()
var stripe = require("stripe")("sk_test_oeXe9v0Dx57ooSxUJCMJzcAs")
const knex = require('../knex')


router.post('/', (req, res, next) => {


	const {amount, token, currentUser, email, cart} = req.body
	const order = {amount, token, currentUser, email, cart}

	checkAmount(order) // this is calculating correctly. must times by 100 tho

	res.sendStatus(404)

	// const charge = stripe.charges.create({
	// 	amount: order.amount,
	// 	currency: "usd",
	// 	source: order.token,
	// 	receipt_email: order.email,
	// 	description: "you bought one dildo"
	// }, (err, charge) => {
	//
	// 	if(!charge.paid) {
	// 		res.sendStatus(400)
	// 	}
	// 	else{
	// 		res.sendStatus(200)
	// 	}
	// })

})

function checkAmount(order) {
	//this orders them by id
	const compare = (a,b) => {
	  if (a.product_id.id < b.product_id.id)
	    return -1;
	  if (a.product_id.id > b.product_id.id)
	    return 1;
	  return 0;
	}
	const cart = order.cart.sort(compare);

	let prodIds = order.cart.map((item) => item.product_id.id)

	knex('products')
		.whereIn('id', prodIds)
    .orderBy('id')
    .then((data) => {

			if(data.length < 1){
        res.sendStatus(404)
      }

			let realPrice = data.reduce((accumulator, item, index) => {
				return accumulator + ( Number(item.price) * cart[index].quantity )
			}, 0)

			console.log(realPrice, order.amount);
    })
		return ""
}

module.exports = router

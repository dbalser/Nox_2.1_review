var express = require('express')
var router = express.Router()
var stripe = require("stripe")("sk_test_oeXe9v0Dx57ooSxUJCMJzcAs");

router.post('/', (req, res, next) => {


	const {amount, token, currentUser, email, cart} = req.body
	const order = {amount, token, currentUser, email, cart}
	// console.log(order.currentUser, order.cart);
	// knex('shopping_carts')
	// 	.where('user_id', userId)
	// 	.then((data) => {
	// 		console.log(data, "________");
	// 		res.send(data)
	// 	})
	// 	.catch((err) => next(err));

	const charge = stripe.charges.create({
		amount: order.amount,
		currency: "usd",
		source: order.token,
		receipt_email: order.email,
		description: "you bought one dildo"
	}, (err, charge) => {

		if(!charge.paid) {
			res.sendStatus(400)
		}
		else{
			res.sendStatus(200)
		}
	})
})

module.exports = router

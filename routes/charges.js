var express = require('express')
var router = express.Router()
var stripe = require("stripe")("sk_test_oeXe9v0Dx57ooSxUJCMJzcAs")
const knex = require('../knex')


router.post('/', (req, res, next) => {


	const {amount, token, currentUser, email, cart} = req.body
	const order = {amount, token, currentUser, email, cart}

	//this orders them by id
	const compare = (a,b) => {
	  if (a.product_id.id < b.product_id.id)
	    return -1;
	  if (a.product_id.id > b.product_id.id)
	    return 1;
	  return 0;
	}
	const orderedCart = order.cart.sort(compare);
	const prodIds = order.cart.map((item) => item.product_id.id)

	knex('products')
		.whereIn('id', prodIds)
    .orderBy('id')
    .then((data) => {

			if(data.length < 1){
        res.sendStatus(404)
      }

			let realPrice = data.reduce((accumulator, item, index) => {
				return accumulator + ( Number(item.price) * orderedCart[index].quantity )
			}, 0)

			let shippingAmount = realPrice + 4.99
			let totalAmount = ((shippingAmount * .07) + shippingAmount).toFixed(2) * 100

			if(totalAmount === order.amount){

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
			}
			else {
				res.sendStatus(400)
			}
    })




})

function checkAmount(order) {

}

module.exports = router

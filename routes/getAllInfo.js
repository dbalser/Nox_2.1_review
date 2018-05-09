var express = require('express');
var router = express.Router();
const knex = require('../knex')

router.get('/', (req, res, next) => {

	let allInfo = {}

	knex('users')
	.orderBy('id')
	.then((data) =>{
	allInfo["users"] = data

	//--------------------------------------
	knex('products')
	.orderBy('id')
	.then((data) =>{
	allInfo["products"] = data

	//--------------------------------------
	knex('charities')
	.orderBy('id')
	.then((data) =>{
	allInfo["charities"] = data

	//--------------------------------------
	knex('services')
	.orderBy('id')
	.then((data) =>{
	allInfo["services"] = data

	//--------------------------------------
	knex('shopping_carts')
	.orderBy('id')
	.then((data) =>{
	allInfo["shopping_carts"] = data

	//--------------------------------------
	knex('testimonials')
	.orderBy('id')
	.then((data) =>{
	allInfo["testimonials"] = data

	//--------------------------------------
	knex('orders')
	.orderBy('id')
	.then((data) =>{
	allInfo["orders"] = data

	//-------- The End ------------
	res.send(allInfo)
	//-------- The End ------------

	})
	})
	})
	})
	})
	})
	})
	})

module.exports = router;

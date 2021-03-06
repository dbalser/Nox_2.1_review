var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').load()

var index = require('./routes/index');
var getAllInfo = require('./routes/getAllInfo');
var users = require('./routes/users');
var products = require('./routes/products');
var services = require('./routes/services');
var charities = require('./routes/charities');
var testimonials = require('./routes/testimonials');
var shopping_carts = require('./routes/shopping_carts');
var orders = require('./routes/orders');
var charges = require('./routes/charges');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://noxfit.com', 'https://noxfit.com/', 'https://noxfit.com/Services', 'https://noxfit.com/Aparel', 'https://noxfit.com/AboutUs', 'https://noxfit.com/#close', 'https://noxfit.com/Admin', 'https://noxfit.com/Admin/PageEdit', 'https://noxfit.com/Admin/Invetory' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


///to be continued
// app.use("/:apiPassword", (req, res, next) => {
//
// 	const passwordResevied = req.body.apiPassword ? req.body.apiPassword : req.params.apiPassword
//
// 	if(passwordResevied === process.env.SECRET_KEY_TO_GET_IN){
// 		next()
// 	}
// 	else{
// 		res.send('access denied :)')
// 	}
// })

app.use('/', index);
app.use('/getAllInfo', getAllInfo);
app.use('/users', users);
app.use('/products', products);
app.use('/services', services);
app.use('/charities', charities);
app.use('/testimonials', testimonials);
app.use('/shopping_carts', shopping_carts);
app.use('/orders', orders);
app.use('/charges', charges);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

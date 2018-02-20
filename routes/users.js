var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../backend/model/user');
var auth = require('../backend/authentication/authentication');
var Income = require('../backend/model/income');
var Expense = require('../backend/model/expense');
var jwt = require('jsonwebtoken'); // sign with default (HMAC SHA256)
var config = require('../backend/config/config');
var app = express();

//this is unprotected resource
app.set('secret',config.secret);

/* authenticates user login. */
router.post('/login', function (req, res, next) {
	console.log('login invoked...');
	var requestParams = req.body;
	console.log('Request params = ' + JSON.stringify(requestParams));
	var incomes ={};
	var expenses = {};
	User.findOne({ username: requestParams.id }).lean().exec(function (err, Users) {
		
		if (!err) {
			console.log(Users);
			if (Users === null) {
				res.status(404).render('index', { user: "You are not registered. Please signup" });
			} else {
				if (auth.isMatched(requestParams.password, Users.password)) {
					
					Income.find({ userId: requestParams.id }, function (err, Incomes) {
						if (!err) {
							incomes = Incomes;
							console.log('No error getting incomes : ');

						} else {
							console.log('error getting incomes : ' + err);
						}
					}).sort({ entryDate: 'desc' });
					//add amount


					
					 Expense.find({ userId: requestParams.id }, function (err, Expenses) {
						if (!err) {

							expenses = Expenses;
							//console.log('Expense = '+expenses);
						} else {

						}
					}).sort({ entryDate: 'desc' });
                    //
                    let token = jwt.sign(Users,app.get('secret'), {
						expiresIn: 1440 // expires in 1 hour
					});
			        
					res.render('home', {error:false,username:Users.username,token: token});

					//res.render('home', {user:Users,total_income:total_income,total_expense:expense});
				} else {
					res.render('index', { user: "Username or Password incorrect" });
				}

			}
		}
		if (err) return console.error(err);

	});





});


/**check username for signup */
router.post('/usernames', function (req, res, next) {
	console.log('usernames invoked...');
	var requestParams = req.body;
	console.log('Request params = ' + JSON.stringify(requestParams));
	User.findOne({ username: requestParams.username }, function (err, Users) {
		if (!err) {
			if (Users == null) {
				res.json({ isAvailable: true, message: 'This username is valid for signup' });
			} else {
				res.json({ isAvailable: false, message: 'This username is not valid for signup' });
			}
		} else {
			console.log('Error occured getting user by username from db');
			res.json({ isAvailable: false, message: 'Error occurred retrieving data from db' });
		}
	});
});


//logout
router.post('/logout', function (req, res, next) {
	console.log('logout invoked...');
	var requestParams = req.body;
	console.log('Request params = ' + JSON.stringify(requestParams));
	res.json({logout: true});
});



/* GET users listing. */
router.get('/resources', function (req, res, next) {
	res.send('respond with a resource');
});



/*POST user sign up data */
router.post('/signup', function (req, res, next) {
	console.log('signup..invoked');
	var requestParams = req.body;
	console.log('Request params = ' + JSON.stringify(requestParams));
	var user = new User({
		firstName: requestParams.firstName,
		lastName: requestParams.lastName,
		username: requestParams.username,
		password: auth.encrypt(requestParams.password),
		email: requestParams.email,
		active: true,
		creationDate: new Date(),
		lastModified: new Date()
	});

	user.save(function (err, users) {
		if (!err) {
			console.log("No error on saving data...");
			res.render('success', { name: users.firstName + " " + users.lastName });
		} else {
			console.log("Error occured while saving data...");
			res.render('index', { error: "Fail to registered" });
		}
	});
	console.log('Reached end of processing...');

});


module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../backend/model/user');
var Income = require('../backend/model/income');
var Expense = require('../backend/model/expense');
var HistoryLogin = require('../backend/model/history_login');
var jwt = require('jsonwebtoken'); // sign with default (HMAC SHA256)
var config = require('../backend/config/config');
var app = express();


app.set('secret', config.secret);

/*POST income */
router.post('/incomes', function (req, res, next) {
	console.log('income..invoked');
	var requestParams = req.body;
	console.log('Request params = ' + JSON.stringify(requestParams));
	//check if the user is already loggedout
	var userId = '';
	jwt.verify(requestParams.token, app.get('secret'), function (err, decoded) {

		console.log("Decoded value=" + decoded._id);
		HistoryLogin.findOne({ userId: decoded._id }, function (err, HistoryLogins) {

			if (err) {
				console.log('Error getting login history ' + err);
			}
			userId = HistoryLogins.userId;
            
			if (HistoryLogins.loggedOutTime != null) {
				console.log("loggedOutTime found = " + req.userId);
				res.render('index');
			}
		}).sort({ loggedInTime: -1 });
	});
	console.log('user id ='+req.userId);
	var income = new Income({
		amount: requestParams.incomeAmount,
		note: requestParams.incomeNote,
		entryDate: new Date(),
		userId: requestParams.userId
	});

	income.save(function (err, incomes) {
		if (!err) {
			console.log("No error on saving data...");
			/*Income.find({userId:requestParams.userId},function(err,Incomes) {
				if (!err) {
					console.log("Incomes ="+Incomes);
					res.send(Incomes);
				} else {
					res.send(Incomes);	
				}
			}).sort({entryDate : 'desc'});*/
			var pageNo = parseInt(requestParams.pageNo);
			var size = parseInt(requestParams.size);
			console.log('pageN0=' + pageNo + ", size=" + size);
			var response;
			var query = {}
			if (pageNo < 0 || pageNo === 0) {
				response = { "error": true, "message": "invalid page number, should start with 1" };
				return res.json(response)
			}
			query.skip = size * (pageNo - 1)
			query.limit = size
			query.sort = '-entryDate';
			// Find some documents
			Income.find({userId:requestParams.userId}, {}, query, function (err, data) {
				// Mongo command to fetch all data from collection.
				/*if (err) {
					response = { "error": true, "message": "Error fetching data" };
				} else {
					response = { "error": false, "message": data };
				}*/

				res.json(data);
			});

		} else {
			console.log("Error occured while saving data...");
			res.json({ error: "Error saving data" });
		}
	});
	console.log('Reached end of processing...');

});


/*POST expense */
router.post('/expenses', function (req, res, next) {
	console.log('expense..invoked');
	var requestParams = req.body;
	console.log('Request params = ' + JSON.stringify(requestParams));

	var expense = new Expense({
		amount: requestParams.expenseAmount,
		note: requestParams.expenseNote,
		entryDate: new Date(),
		userId: requestParams.userId
	});

	expense.save(function (err, expenses) {
		if (!err) {
			console.log("No error on saving data...");
			/*Expense.find({ userId: requestParams.userId }, function (err, Expenses) {
				if (!err) {
					res.send(Expenses);
				} else {
					res.send(Expenses);
				}
			}).sort({ entryDate: 'desc' });*/
			var pageNo = parseInt(requestParams.pageNo);
			var size = parseInt(requestParams.size);
			console.log('pageN0=' + pageNo + ", size=" + size);
			var response;
			var query = {}
			if (pageNo < 0 || pageNo === 0) {
				response = { "error": true, "message": "invalid page number, should start with 1" };
				return res.json(response)
			}
			query.skip = size * (pageNo - 1)
			query.limit = size
			query.sort = '-entryDate';
			// Find some documents
			Expense.find({userId:requestParams.userId}, {}, query, function (err, data) {
				// Mongo command to fetch all data from collection.
				/*if (err) {
					response = { "error": true, "message": "Error fetching data" };
				} else {
					response = { "error": false, "message": data };
				}*/

				res.json(data);
			});

		} else {
			console.log("Error occured while saving data...");
			res.json({ error: "Error saving data" });
		}
	});
	console.log('Reached end of processing...');

});






module.exports = router;

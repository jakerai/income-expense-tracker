var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../backend/model/user');
var Income = require('../backend/model/income');
var Expense = require('../backend/model/expense');


/*POST income */
router.post('/income',function (req, res, next) {
	console.log('income..invoked');
    var requestParams = req.body;
	console.log('Request params = '+JSON.stringify(requestParams));
	
	var income = new Income({
		amount: requestParams.incomeAmount,
		note: requestParams.incomeNote,
        entryDate: new Date(),
        userId:requestParams.userId
	});

	 income.save(function (err, incomes) {
		if (!err) {
			console.log("No error on saving data...");
			Income.find({},function(err,Incomes) {
				if (!err) {
					res.send(Incomes);
				} else {
					res.send(Incomes);	
				}
			}).sort({entryDate : 'desc'});
			
		} else {
			console.log("Error occured while saving data...");
			res.json({error:"Error saving data"});
		}
	});
    console.log('Reached end of processing...');
	
});


/*POST expense */
router.post('/expense',function (req, res, next) {
	console.log('expense..invoked');
    var requestParams = req.body;
	console.log('Request params = '+JSON.stringify(requestParams));
	
	var expense = new Expense({
		amount: requestParams.expenseAmount,
		note: requestParams.expenseNote,
        entryDate: new Date(),
        userId:requestParams.userId
	});
     
	 expense.save(function (err, expenses) {
		if (!err) {
			console.log("No error on saving data...");
			Expense.find({},function(err,Expenses) {
				if (!err) {
					res.send(Expenses);
				} else {
					res.send(Expenses);	
				}
			}).sort({entryDate : 'desc'});
			//res.send(expenses);
		} else {
			console.log("Error occured while saving data...");
			res.json({error:"Error saving data"});
		}
	});
    console.log('Reached end of processing...');
	
});




module.exports = router;

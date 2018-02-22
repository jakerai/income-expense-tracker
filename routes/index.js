var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'income-expense-tracker', message: ' Have better control over your money by organizing your income and daily expenses!' });

});

module.exports = router;

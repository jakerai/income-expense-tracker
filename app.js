var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var money = require('./routes/money');

var app = express();

//app.use('/api', api); // redirect API calls
//app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//enabling cors for all requests else will hit cross origin resource sharing error
app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/money', money);


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


///Mongoose buffers all the commands until it's connected to the database. This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.
var uri = 'mongodb://iet:iet@ds237858.mlab.com:37858/iet';
var options = {
	autoIndex: false, // Don't build indexes
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	keepAlive: 120
};
//For long running applications, it is often prudent to enable keepAlive with a number of milliseconds. Without it, after some period of time you may start to see "connection closed" errors for what seems like no reason. If so, after reading this, you may decide to enable keepAlive:
//options.server.socketOptions = options.replset.socketOptions = { keepAlive: 120 };
//Mongoose async operations, like .save() and queries, return Promises/A+ conformant promises. This means that you can do things like MyModel.findOne({}).then() and yield MyModel.findOne({}).exec() (if you're using co).For backwards compatibility, Mongoose 4 returns mpromise promises by default.

mongoose.Promise = global.Promise;
mongoose.connect(uri, options, function (err) {
	if (err) {
		console.log('No Mongodb server running.');
	} else {
		// It's not a good idea to create a new MongoClient object every time when we have to make a request to the database. That's why I moved the running of the express server inside the callback of the connect function
		console.log('Mongodb server connected...');
		app.listen(3001, function () {
			console.log('Server started listening at port 3001');
		})
	}
});

module.exports = app;

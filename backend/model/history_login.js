var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId; 

var historyLoginSchema = new Schema({
	  loggedInTime: {
		type: Date,
		required: true
	  },
	  loggedOutTime: {
		type: Date
	  },
	  token: {
		type: String
	  },
		 userId: {
		type: String,
		required: true,
		trim:true
	}
});
//exports is an object so you can attach properties or function to it
var historyLoginModel = mongoose.model('history_login', historyLoginSchema);
module.exports = historyLoginModel;  


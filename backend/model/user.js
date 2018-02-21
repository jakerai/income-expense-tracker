var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId; 

var userSchema = new Schema({
	id:{
    type: Schema.ObjectId
	},
	firstName: {
		type: String,
		required: true,
		trim: true
	  },
	lastName: {
		type: String,
		required: true,
		trim: true
	  },
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	  },
	password: {
		type: String,
		required: true,
		 },
	email: {
		type: String,
		unique:true,
		required: true,
		trim: true
	  },
	state: {
		type: Number
		 },
	creationDate: {
		type: Date
	},
	lastModified: {
		type: Date
	}
});
//exports is an object so you can attach properties or function to it
var userModel = mongoose.model('user', userSchema);
module.exports = userModel;  


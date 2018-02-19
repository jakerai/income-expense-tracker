var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
	 amount: {
		type: Number,
		required: true
	  },
   	 note: {
		type: String,
		required: true,
		trim: true
	  },
	 entryDate: {
		type: Date,
		required: true
		},
		userId: {
			type: String,
			required: true,
			trim: true
		}
});
//exports is an object so you can attach properties or function to it
var expenseModel = mongoose.model('expense', expenseSchema);
module.exports = expenseModel;



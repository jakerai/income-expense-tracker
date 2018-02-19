var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var incomeSchema = new Schema({
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
var incomeModel= mongoose.model('income', incomeSchema);
module.exports = incomeModel;



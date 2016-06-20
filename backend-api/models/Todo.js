var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
	itemData: String,
	completed: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Todo', TodoSchema);
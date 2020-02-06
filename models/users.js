const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
	rating: {
		type: String
	},
	gameid: {
		type: String
	}
});
const userScheme = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 50
		},
		lastname: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 50
		},
		phonenumber: {
			//required
			type: String,
			required: true,
			unique: true,
			minlength: 2,
			maxlength: 13
		},
		email: {
			//required
			type: String,
			required: true,
			unique: true,
			minlength: 3
		},
		password: {
			//required
			type: String,
			required: true,
			minlength: 5
		},
		profile_image: {
			type: String
		},
		wallet: {
			type: String,
			minlength: 2,
			maxlength: 4
		},
		game: [gameSchema]
	},
	{ timestamps: true }
);
module.exports = mongoose.model('User', userScheme);

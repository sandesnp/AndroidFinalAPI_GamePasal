const mongoose = require('mongoose');
const AdvertisementScheme = new mongoose.Schema(
	{
		position: {
			type: String,
			required: true
		},
		image: {
			type: String
		},
		title: {
			//required
			type: String,
			minlength: 2,
			maxlength: 50
		},
		price: {
			//required
			type: String,
			minlength: 3
		},
		developer: {
			//required
			type: String,
			minlength: 5
		},
		description: {
			//required
			type: String,
			minlength: 5
		}
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Advertisement', AdvertisementScheme);

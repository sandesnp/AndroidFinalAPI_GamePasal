const express = require('express');
const router = express.Router();
const ADVER = require('../models/advertisements');

router.post('/', (req, res, next) => {
	ADVER.create({
		position: req.body.position,
		image: req.body.image,
		title: req.body.title,
		price: req.body.price,
		developer: req.body.developer,
		description: req.body.description
	})
		.then(adverA => {
			res.json('Successfully Registered an ADVERTISEMENT');
		})
		.catch(next);
});

router.get('/all', (req, res, next) => {
	ADVER.find()
		.then(adverB => {
			res.json(adverB);
		})
		.catch(next);
});

module.exports = router;

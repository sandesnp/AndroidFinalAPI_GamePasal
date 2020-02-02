const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const USER = require('../models/users');
const AUTH = require('./auth');

router.post('/signup', (req, res, next) => {
	USER.findOne({ email: req.body.email })
		.then(usersA => {
			if (usersA != null) {
				let err = new Error(
					'This email has been already used for Registration.'
				);
				err.status = 401;
				return next(err);
			} else {
				bcrypt.hash(req.body.password, 10, function(err, hash) {
					if (err) {
						throw new Error('Could not encrypt Password!');
					}
					let USERA = new USER(req.body);
					USERA.password = hash;
					USERA.save().then(usersB => {
						let token = jwt.sign({ userID: usersB._id }, process.env.SECRET);
						res.json({ status: 'Signup Success!', token: token });
					});
				});
			}
		})
		.catch(next);
});

router.post('/login', (req, res, next) => {
	USER.findOne({ email: req.body.email })
		.then(usersA => {
			if (usersA === null) {
				let err = new Error('Email not found!');
				err.status = 401;
				return next(err);
			}
			bcrypt.compare(req.body.password, usersA.password, function(err, status) {
				if (!status) {
					let err = new Error('Password does not match!');
					err.status = 401;
					return next(err);
				}
				let token = jwt.sign({ userID: usersA._id }, process.env.SECRET);
				res.json({ status: 'Successfully logged in', token: token });
			});
		})
		.catch(next);
});

router.get('/profile', AUTH.verifyUser, (req, res, next) => {
	res.json({
		email: req.user.email,
		firstname: req.user.firstname,
		lastname: req.user.lastname,
		phonenumber: req.user.phonenumber,
		profile_image: req.user.profile_image,
		wallet: req.user.wallet,
		game: req.user.game
	});
});

// req.user._id -->here user are coming frm AUTH

router.put('/profile', AUTH.verifyUser, (req, res, next) => {
	USER.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
		.then(UserB => {
			res.json({
				_id: UserB._id,
				email: UserB.email,
				firstname: UserB.firstname,
				lastname: UserB.lastname,
				phonenumber: UserB.phonenumber,
				profile_image: UserB.profile_image,
				wallet: UserB.wallet,
				game: UserB.game
			});
		})
		.catch(next);
});

module.exports = router;

// res.json('check: #101');
// 	return;

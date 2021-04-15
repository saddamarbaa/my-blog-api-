/** @format */

// Create User model just by requiring the User
const User = require("../models/User");

// API Endpoint for Login
const login = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// Finds one document. // using callback
	// Find one user whose `email` is 'given email', and `password` is 'given password' otherwise `null`
	User.findOne({ email: email, password: password }, (err, user) => {
		if (user) {
			{
				res.status(200).send({
					status: "Valid",
					token: user.id,
				});
			}
		} else {
			res.status(404).send({
				status: "Not Found",
			});
		}
	});
};

module.exports = login;

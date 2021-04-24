/** @format */

// Import JSON Web Tokens (JWTs) from node_modules
const jwt = require("jsonwebtoken");

// Create User model just by requiring the User
const User = require("../models/User");

// Require dotenv(to manage secrets and configs)
// Using dotenv package to create environment variables
const dotenv = require("dotenv");
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

// function for Generating Token
const generateAccessToken = (user) => {
	// expires after 2 days (172800 seconds)
	return jwt.sign({ user: user }, TOKEN_SECRET, {
		expiresIn: "18000s",
	});
};

// API Endpoint for Login
const login = (req, res) => {
	// Read username and password from request body
	const email = req.body.email;
	const password = req.body.password;

	// Finds one document. // using callback
	// Find one user whose `email` is 'given email', and `password` is 'given password' otherwise `null`
	User.findOne({ email: email, password: password }, (err, user) => {
		// if user log in success, generate a JWT token for the user with a secret key
		if (user) {
			// Generate an access token
			const token = generateAccessToken(user);
			{
				res.status(200).send({
					status: "Valid",
					token: token, // return token to the Back-End
				});
			}
		} else {
			console.log("Username or password incorrect");
			res.status(404).send({
				status: "Not Found",
			});
		}
	});
};

module.exports = login;

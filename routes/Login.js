/** @format */

// Import express framework from node_modules
const express = require("express");

// Grab The Router from express
const router = express.Router();

// Grab The login Object from controllers
const login = require("../controllers/login");

// API Endpoint for register
router.post("/", login);

module.exports = router;

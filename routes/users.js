var express = require('express');
var router = express.Router();
const fs = require('fs');
const CryptoJS = require('crypto-js');
const { addUser } = require('../services/userService');

/* GET users listing. */
router.get('/', function(req, res, next) {
	
	fs.readFile('users.json', function(err, data) {
		if (err) {
			console.log(err);
		}

		const users = JSON.parse(data);
		res.send(users);
		return;
	});
});

router.post('/add', function(req, res, next) {
	const serviceResponse = addUser(req.body);
	res.send(serviceResponse);
});

module.exports = router;

const fs = require('fs');
const CryptoJS = require('crypto-js');

function addUser(newUser) {
    newUser.password = CryptoJS.AES.encrypt(newUser.password, 'saltKey').toString();

    fs.readFile('users.json', function(err, data) {
		if (err) {
			console.log(err);

			if (err.code == 'ENOENT') {
				console.log('Filen finns inte');

				fs.writeFile('users.json', JSON.stringify([newUser], null, 2), function(err) {
					if (err) {
						console.log(err);
					}
				}); // SKAPAR NY FIL OM ANDRA EJ FINNS
			}

			return '404 - Something went wrong' // kan vara en redirect till en 404-sida (med res.send)
		}

		const users = JSON.parse(data);
		
		users.push(newUser);

		fs.writeFile('users.json', JSON.stringify(users, null, 2), function(err) {
			if (err) {
				console.log(err);
			}
		});

		return '201 - User added';
	})
}

module.exports = { addUser };

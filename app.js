const express = require('express');

const app = express();

const dbConnect = require('./db/dbConnect');

dbConnect();
const User = require('./db/userModel');

const newUser = new User({
	email: 'example@email.com',
	password: 'password123',
});

// insert/save the new user to the db
newUser
	.save()
	.then(() => {
		console.log('User inserted successfully');
	})
	.catch((error) => {
		console.error('Error inserting user: ', error);
	});
module.exports = app;

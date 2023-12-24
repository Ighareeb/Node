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

// find a specific item in collection by passing a query as argument to find method
User.find({ email: 'example@email.com' })
	.then((users) => {
		console.log('Users found: ', users);
	})
	.catch((error) => {
		console.error('Error finding user: ', error);
	});

// find all users in MongoDB collection --> use find method without any query criteria
// retrieves all documents from the db - *returns an array*
// User.find()
// 	.then((users) => {
// 		console.log('Users found: ', users);
// 	})
// 	.catch((error) => {
// 		console.error('Error finding user: ', error);
// 	});

module.exports = app;

const express = require('express');

const app = express();

const dbConnect = require('./db/dbConnect');

dbConnect();
const User = require('./db/userModel');
//create a new user
const newUser = new User({
	email: 'example5@email.com',
	password: 'password123',
});

// INSERT/save the new user to the db
newUser
	.save()
	.then(() => {
		console.log('User inserted successfully');
	})
	.catch((error) => {
		console.error('Error inserting user: ', error);
	});

// FIND a specific item in collection by passing a query as argument to find method
User.find({ email: 'example@email.com' })
	.then((users) => {
		console.log('Users found: ', users);
	})
	.catch((error) => {
		console.error('Error finding user: ', error);
	});

// FIND all users in MongoDB collection --> use find method without any query criteria
// retrieves all documents from the db - *returns an array*
// User.find()
// 	.then((users) => {
// 		console.log('Users found: ', users);
// 	})
// 	.catch((error) => {
// 		console.error('Error finding user: ', error);
// 	});

// UPDATE/MODIFY collection using updateOne()/updateMany() methods along with query object as fist argument
// and 2nd argument is the update object that specifies the fields to be update
// able to specify update operation/specific actions using operators
// rename, un/set, inc(for fields) push, pull, pop, addToSet (for Arrays)
User.updateOne({ email: 'example2@email.com' }, { password: 'newpassword123' })
	.then((users) => {
		console.log('User updated successfully: '.users);
	})
	.catch((error) => {
		console.error('Error updating user: ', error);
	});

// DELETE using deleteOne()/deleteMany() passing query object as argument
User.deleteOne({ email: 'example2@email.com' })
	.then((users) => {
		console.log('User deleted successfully: ', users);
	})
	.catch((error) => {
		console.error('Error deleting user: ', error);
	});

//CREATE INDEX (argument is the field you create index on) so COVERED QUERIES can be made.
User.collection.createIndex({ email: 1 });
//use find method to query documents; .select() chained to specify which fields to include in the query result
//not automatically generated id from MongoDB accessed with underscore id (_id)
User.find({ email: 'example@email.com' })
	.select({ email: 1, _id: 0 })
	.then((users) => {
		console.log('Users found: ', users);
	})
	.catch((error) => {
		console.error('Error finding user: ', error);
	});

module.exports = app;

// *npm i mongoose* imports mongoose package which is a
// popular object document mapper for MongoDB in Node.js apps
// that allows you to interact with MongoDB using JS objects

// dotenv package that simplifies managing environment variables.
// It loads variables from a.env file into the process.env object, making them accessible within your application.
// This keeps sensitive information out of your code, promoting better security and configuration flexibility by separating concerns.
const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
	mongoose
		.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Successfully connected to MongoDB Atlas');
		})
		.catch((error) => {
			console.log('Unable to connect MongoDB');
			console.error(error);
		});
}

module.exports = dbConnect;

//USING MIDDLEWARE FUNCTIONS
const express = require('express');

const app = express();
// Middleware functions have access to the request object (req), the response object (res), and the next middleware function(variable next) in the application’s request-response cycle.
// (note: if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.)
const loggerMiddleware = (req, res, next) => {
	const currentTimestamp = new Date().toISOString();
	console.log(`[${currentTimestamp}] ${req.method} ${req.url}`);
	next(); //in this case the next function is the route handler middleware function .get
};
app.use(loggerMiddleware);

// terminal shows [2023-12-24T07:22:08.353Z] GET / (when you go to localhost 3000) (after listen method is called*)
//define get route
app.get('/', (req, res) => {
	res.send('Hello World');
});
//start the express server listening on specified port and gives response when get req made
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});

// USING MongoDB
// const http = require('http');
// const app = require('./app');

// app.set('port', process.env.PORT ?? 3000);

// const server = http.createServer(app);

// server.on('listening', () => {
// 	console.log('Listening on port' + (process.env.PORT ?? 3000));
// });

// Set up for basic Node Express app
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;

// let todos = [
// 	{ id: 1, title: 'Todo 1' },
// 	{ id: 2, title: 'Todo 2' },
// 	{ id: 1, title: 'Todo 3' },
// ];

// app.get('/todos', (req, res) => {
// 	res.json(todos);
// });

// app.use(bodyParser.json());
// app.listen(PORT, () => {
// 	console.log(`Listening on port ${PORT}`);
// });
// END

// // USING 3rd PARTY MIDDLEWARE - helmet package automatically adds additional security related HTTP headers to app
// // inspect network tab in developers tools to see the security headers being added
// const express = require('express');
// const helmet = require('helmet');

// const app = express();
// // helmet will be used for every request it is declared before the route is executed
// app.use(helmet());

// app.get('/', (req, res) => {
// 	res.send('Hello World');
// });
// app.get('/users', (req, res) => {
// 	res.send('User List');
// });

// app.listen(3000, () => {
// 	console.log('Server is running on port 3000');
// });

// USING MIDDLEWARE FUNCTIONS
// const express = require('express');

// const app = express();
// // Middleware functions have access to the request object (req), the response object (res), and the next middleware function(variable next) in the application’s request-response cycle.
// // (note: if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.)
// // (note2: Middleware functions are executed sequentially in the order they are passed to the Express.js app.use() function.)
// const loggerMiddleware = (req, res, next) => {
// 	const currentTimestamp = new Date().toISOString();
// 	console.log(`[${currentTimestamp}] ${req.method} ${req.url}`);
// 	next(); //in this case the next function is the route handler middleware function .get
// };
// app.use(loggerMiddleware);

// // terminal shows [2023-12-24T07:22:08.353Z] GET / (when you go to localhost 3000) (after listen method is called*)
// //define get route
// app.get('/', (req, res) => {
// 	res.send('Hello World');
// });
// //start the express server listening on specified port and gives response when get req made
// app.listen(3000, () => {
// 	console.log('Server is running on port 3000');
// });

// // USING MongoDB
// const http = require('http');
// const app = require('./app');

// app.set('port', process.env.PORT ?? 3000);

// const server = http.createServer(app);

// server.on('listening', () => {
// 	console.log('Listening on port' + (process.env.PORT ?? 3000));
// });

// // Set up for basic Node Express app
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
// // END

//AUTHENTICATION using Passport.js and JSON WebToken (JWK)
const express = require('express');
const passport = require('passport'); //authentication middleware
const passportJWT = require('passport-jwt'); //for implementing JWT strategy
const jwt = require('jsonwebtoken'); //for generating and verifying JWTs
//npm i passport passport-jwt jsonwebtoken

const app = express();
// key that will be used to sign & verify JWT tokens
const secretKey = process.env.SECRET_KEY || 'secret'; //normally located in .env file rather than declared here

//no need to install body-parser on newer versions of Express as included by default
app.use(express.json()); //parses incoming JSON request bodies

app.use(passport.initialize()); //initializes passport.js

//define JWT strategy and Extract method (taken from passportJWT)
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const users = [
	{ id: 1, username: 'admin', password: 'admin123' },
	{ id: 2, username: 'user', password: 'user123' },
];

//Configure JWT strategy
passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), //extracts JWT from Authorization header
			secretKey: secretKey,
		},
		(jwtPayload, done) => {
			const user = users.find((u) => u.id === jwtPayload.sub);

			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		},
	),
);

//create route for generating JWT
app.post('/login', (req, res) => {
	const { username, password } = req.body;
	const user = user.find(
		(u) => u.username === username && u.password === password,
	);

	if (user) {
		const payload = { sub: user.id, username: user.username }; //payload to be signed
		const token = jwt.sign(payload, secretKey);
		res.json({ token: token }); //returns token to client
	} else {
		res.status(401).json({ message: 'Authentication failed' });
	}
});

//create protected route
app.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({ message: 'Protected route accessed successfully' });
	},
);
app.listen(3000, () => {
	console.log('Server running on port 3000');
});

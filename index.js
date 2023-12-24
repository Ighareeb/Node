const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT ?? 3000);

const server = http.createServer(app);

server.on('listening', () => {
	console.log('Listening on port' + (process.env.PORT ?? 3000));
});

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

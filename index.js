const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let todos = [
	{ id: 1, title: 'Todo 1' },
	{ id: 2, title: 'Todo 2' },
	{ id: 1, title: 'Todo 3' },
];

app.get('/todos', (req, res) => {
	res.json(todos);
});

app.use(bodyParser.json());
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

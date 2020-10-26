const express = require('express');
const bodyParser = require('body-parser');

// imported routes
const todosRouter = require('./routes/todos.router');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware configuring
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SETUP STATICS
app.use(express.static('public'));

// REGISTER ROUTES
app.use('/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

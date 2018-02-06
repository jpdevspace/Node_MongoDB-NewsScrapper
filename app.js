const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const request = require('request');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware: Static Public Folder
app.use(express.static('public'));

// Mongoose connection
mongoose.connect('mongodb://localhost/mongoosebasicsDB');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware: Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware: Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`News Scrapper listening on port ${PORT}`));
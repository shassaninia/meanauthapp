const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/users');

const port = 3000;

//cors middleware
//Use cors so we can call our api from a differnt domain.
app.use(cors());

//bodyParser middleware
//parses incoming request bodies, for example, when you submit a form, you
//can intercept the data
app.use(bodyParser.json())

app.use('/users',users);

//Index route
app.get('/', (req,res) => {
    res.send('Invalid Endpoint');
} );

app.listen(port, () => {
    console.log("Server started on port " + port)
});
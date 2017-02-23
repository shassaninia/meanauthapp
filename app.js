const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database in declared in config file
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('error',(error)=>{
    console.log('Database error ' +  error)
});

mongoose.connection.on('connected',()=>{
    console.log('Connected to database ' +  config.database)
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//cors middleware
//Use cors so we can call our api from a differnt domain.
app.use(cors());

//Set static folder
//Our client side static content will be served out of the public folder
app.use(express.static(path.join(__dirname,'public')));
//bodyParser middleware
//parses incoming request bodies, for example, when you submit a form, you
//can intercept the data
app.use(bodyParser.json())

//Passport middleware (http://passportjs.org/)
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//Index route
app.get('/', (req,res) => {
    res.send('Invalid Endpoint');
} );

app.get('*',(req,res)=>{
    res.sendfile(path.join(__dirname,'public/index.html'));
});
app.listen(port, () => {
    console.log("Server started on port " + port)
});
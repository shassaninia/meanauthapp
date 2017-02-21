const express = require('express');
const router = express.Router();

//Register route for /users/register
//Since we are in users, no need to put /users/
router.post('/register',(req, res, next)=> {
    res.send('REGISTER');
});

//Authenticate
router.post('/authenticate',(req, res, next)=> {
    res.send('Authenticate');
});

//Profile
router.get('/profile',(req, res, next)=> {
    res.send('Profile');
});


module.exports = router;
const express = require('express');
const router = express.Router();

// Item Model 
const User = require('../../models/User');

// @route GET api/users
// @desc Register new user
// @access Public 

router.get('/', (req, res) => {
    res.send('register')
});

module.exports = router;
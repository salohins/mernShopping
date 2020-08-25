const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const router = express.Router();

// Item Model 
const User = require('../../models/User');

// @route  GET api/users
// @desc   Register new user
// @access Public  

router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'please enter all fields' })
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'user already exists' });

            const newUser = new User({
                name,
                email,
                password
            })

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })

        })
});

// @route POST api/users/auth
// @desc  Auth user
// @acess Public

router.post('/auth', (req, res) => {
    const { email, password } = req.body

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    // Check for existing user 
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' })
                // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({  msg: 'Invalid credentials'  })

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
})

// @route GET api/users/auth/user
// @desc  Auth user
// @acess Private

router.get('/auth/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})


module.exports = router;
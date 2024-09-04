// routes/auth.js

const express = require('express');
const Sequelize = require('sequelize');
const User = require('../models/User');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');
const { validateSignUp, validateSignIn, validateUpdateUser } = require('../middlewares/validation');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

// Sign-up route
router.post('/sign-up', validateSignUp, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists with this email' })
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ username, email, password: hashedPassword });
        const token = generateToken(newUser.id);
        res.status(201).json({ message: 'User created successfully', token, user: newUser });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Sign-in route
router.post('/sign-in', validateSignIn, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user.id);
        res.json({ message: 'Login successful', token, user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

router.put('/users', validateUpdateUser, authenticate, async (req, res) => {
    const { username, email, password } = req.body;
    const userId = req.userId; // Assumes 'req.userId' is set by the 'authenticate' middleware

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (password) {
            const hashedPassword = await hashPassword(password);
            user.password = hashedPassword;
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists) {
                return res.status(409).json({ error: 'Email is already taken' });
            }
            user.email = email;
        }

        if (username && username !== user.username) {
            const usernameExists = await User.findOne({ where: { username } });
            if (usernameExists) {
                return res.status(409).json({ error: 'Username is already taken' });
            }
            user.username = username;
        }

        await user.save();    
        res.json({ message: 'User updated successfully!', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

router.get('/user',authenticate, async (req, res) => {
    const userId = req.userId
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }    
        res.json({ message: 'User data retrived successfully', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;

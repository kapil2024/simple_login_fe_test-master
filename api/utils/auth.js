const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Hash password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Compare password
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Generate JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { hashPassword, comparePassword, generateToken };

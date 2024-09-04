const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function authenticate(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    else {
        const data = jwt.verify(token, secretKey)
        req.userId = data.userId
        next()
    }
}

module.exports = authenticate;
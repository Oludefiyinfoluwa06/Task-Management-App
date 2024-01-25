const jwt = require('jsonwebtoken');

const User = require('../models/user');

const protectRoute = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ 'error': 'User is not authorized, try logging in again' });
        }
    }

    if (!token) {
        res.status(401).json({ 'error': 'User is not authorized and no token, try logging in' });
    }
}

module.exports = {
    protectRoute,
}
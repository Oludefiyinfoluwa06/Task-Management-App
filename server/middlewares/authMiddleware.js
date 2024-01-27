const jwt = require('jsonwebtoken');

const User = require('../models/user');

const protectRoute = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ 'error': 'User is not authorized, try logging in again' });
        }
    } else {
        res.status(401).json({ 'error': 'User is not authorized and no token, try logging in' });
    }
}

module.exports = {
    protectRoute,
}
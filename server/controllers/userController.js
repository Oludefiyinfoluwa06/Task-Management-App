const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ 'error': 'Input fields cannot be empty' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ 'error': 'Enter a valid email' });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ 'error': 'Enter a strong password that contains uppercase and lowercase letters, numbers and special characters' });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
        return res.status(400).json({ 'error': 'Email exists already, use another email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hash });

    if (!user) {
        return res.status(500).json({ 'error': 'An error occured, try again later' });
    }

    return res.status(200).json({ 'message': 'Registration successful' });

}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 'error': 'Input fields cannot be empty' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ 'error': 'Email does not exist, try registering' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        return res.status(400).json({ 'error': 'Password is incorrect' });
    }

    return res.status(200).json({ 'message': 'Login successful', 'id': user.id, 'email': user.email, 'username': user.username, 'token': generateToken(user._id) });

}

const userProfile = async (req, res) => {
    const { _id, username, email } = await User.findById(req.user.id);

    return res.status(200).json({ 'user': { id: _id, username, email } });
}

const updateProfile = async (req, res) => {
    const id = req.params.id;

    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ 'error': 'Input fields cannot be empty' });
    }

    const user = await User.findByIdAndUpdate(id, { username, email }, { new: true });

    if (!user) {
        return res.status(400).json({ 'error': 'An error occurred, try again later' });
    }

    return res.status(200).json({ 'message': 'Profile updated successfully' });
}

const deleteProfile = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(400).json({ 'error': 'An error occurred, try again later' });
    }

    return res.status(200).json({ 'message': 'Profile deleted successfully' });
}

module.exports = {
    register,
    login,
    userProfile,
    updateProfile,
    deleteProfile,
}
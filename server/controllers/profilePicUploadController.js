const ProfilePic = require('../models/profilePic');

const uploadPic = async (req, res) => {
    const { profile } = req.file;

    if (!profile) {
        return res.status(400).json({ 'error': 'Select an image' });
    }

    const profilePic = await ProfilePic.create({ 'user': req.user.id, 'profilePic': profile });

    if (!profilePic) {
        return res.status(500).json({ 'error': 'An error occured, please try again later' });
    }

    return res.status(200).json({ 'profile': profilePic });
}

module.exports = {
    uploadPic,
}
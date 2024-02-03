const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profilePicSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    profilePic: {
        type: Buffer,
        requried: true,
    }
});

const ProfilePic = mongoose.model('ProfilePic', profilePicSchema);
module.exports = ProfilePic;
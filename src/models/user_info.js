const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    }
})

//jwt creation
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
        googleId: user.googleId
    }, 'okr-management', {
        expiresIn: '1h'
    })

    return token
}

const UserInfo = new mongoose.model('UserInfo', userSchema)

module.exports = UserInfo
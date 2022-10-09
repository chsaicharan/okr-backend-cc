const express = require('express');
const router = new express.Router()
const googleAuth = require('../middleware/googleAuth')
const UserInfo = require('../models/user_info');

router.post('/login', googleAuth, async (req, res) => {
    try {
        const userDetails = UserInfo(req.body.userDetails)
        const user = await UserInfo.findOne({
            'googleId': userDetails.googleId
        })
        if (!user) {
            const newUser = new UserInfo(userDetails)
            await newUser.save()
        }
        const token = await userDetails.generateAuthToken()
        res.send({
            ...req.body.userDetails,
            accessToken: token
        })
    } catch (e) {
        res.send(e)
    }
})


module.exports = router
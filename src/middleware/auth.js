const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const token = req.header('Authorization')
    try {
        const decoded = jwt.verify(token, 'okr-management')
        req.body.googleId = decoded.googleId
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = auth
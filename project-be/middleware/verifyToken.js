const jwt = require('jsonwebtoken')
const statusText = require('../constants/status-text').message
require('dotenv').config()

module.exports = {
    verifyToken: (request, response, next) => {
        if (!request.headers.authorization) {
            return response.status(401).json(statusText.invalidToken)
        } else {
            let token = request.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return response.status(401).json(statusText.invalidToken)
            } else {
                jwt.verify(token, process.env.PRIVATE_KEY, (error, payload) => {
                    if (error) {
                        return response.status(401).json(statusText.invalidToken)
                    } else {
                        request.user = payload
                        next()
                    }
                })
            }
        }
    }
}
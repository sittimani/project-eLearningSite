require('dotenv').config()
const rolePrivillages = require('../models/rolesPrivillages.js')
const roles = require('../models/role')
const jwt = require('jsonwebtoken')

module.exports = {
    getMyRole: async function (roleName) {
        return new Promise((resolve, reject) => {
            roles.findOne({ roleName: roleName }).then(data => {
                rolePrivillages.findOne({ _id: data.id }).then(responseData => {
                    resolve(responseData)
                }).catch(error => {
                    reject(0)
                })
            }).catch(error => {
                reject(0)
            })
        });
    },
    createToken: function (role, body) {
        const user = {
            _id: body.userID,
            email: body.email,
            role: role
        }
        const accessToken = jwt.sign({ user }, process.env.SECREAT_KEY, { expiresIn: "1d" })
        const responseData = {
            accessToken: accessToken,
            roles: role
        }
        return responseData;
    },
    verifyToken: (request, response) => {
        console.log(request.headers)
        if (!request.headers.authorization) {
            return response.status(401).send("unauthorized request")
        } else {
            let token = request.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return response.status(401).send("unauthorized request")
            } else {
                jwt.verify(token, process.env.SECREAT_KEY, (error, payload) => {
                    if (error) {
                        return response.status(401).send("unauthorized request : " + error)
                    } else {
                        return response.json(payload)
                    }
                })
            }
        }
    }
}
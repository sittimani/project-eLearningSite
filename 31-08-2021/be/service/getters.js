require('dotenv').config()
const rolePrivillages = require('../models/rolesPrivillages.js')
const roles = require('../models/role')
const user = require('../models/user-model')
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
        return new Promise((resolve, reject) => {
            user.findOne({ userID: body._id }, (err, res) => {
                if(err){
                    reject("Internal server problem")
                }
                const users = {
                    _id: res.userID,
                    name: res.name,
                    role: role
                }
                const accessToken = jwt.sign({ users }, process.env.SECREAT_KEY, { expiresIn: "1d" })
                const responseData = {
                    accessToken: accessToken,
                }
                resolve(responseData)
            })
        })
    },
    verifyToken: (request, response) => {
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
    },
    structureStudentData(value){
        const body = {
            name: value.name,
            age: value.age,
            gender: value.gender,
            phone: value.phone,
            userID: value.userID
        }
        return body;
    },
    strucutureProfessorData(value){
        const body = {
            name: value.name,
            age: value.age,
            gender: value.gender,
            phone: value.phone,
            userID: value.userID,
            workingAt: value.workingAt
        }
        return body;
    }
}
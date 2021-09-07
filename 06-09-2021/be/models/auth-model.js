const mongoose = require('mongoose')

const Schema = mongoose.Schema
const authSchema = new Schema({
    email:{
        type: String
    }, 
    password: {
        type: String
    },
    role: {
        type: String
    },
    emailVerified: {
        type: Boolean
    }, 
    verified: {
        type: String
    }
}, { timestamps: true, versionKey: false })


module.exports = mongoose.model('authSchema', authSchema, "logins")
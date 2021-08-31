const mongoose = require('mongoose')

const Schema = mongoose.Schema
const authSchema = new Schema({
    email:{
        type: String
    }, 
    password: {
        type: Number
    },
    role: {
        type: String
    }, 
    verified: {
        type: String
    }
}, { timestamps: true, versionKey: false })


module.exports = mongoose.model('authSchema', authSchema, "logins")
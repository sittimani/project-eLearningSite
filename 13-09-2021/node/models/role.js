const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roleSchema = new Schema({
    roleName: {
        type: String
    }
}, { timestamps: true, versionKey: false })


module.exports = mongoose.model('roles', roleSchema, "roles")
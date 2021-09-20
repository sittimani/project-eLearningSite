const mongoose = require('mongoose')

const Schema = mongoose.Schema
const courseSchema = new Schema({}, {strict:false, timestamps: true, versionKey: false })


module.exports = mongoose.model('courseSchema', courseSchema, "courses")
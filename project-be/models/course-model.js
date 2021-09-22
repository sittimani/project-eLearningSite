import mongoose from 'mongoose'

const Schema = mongoose.Schema
const courseSchema = new Schema({}, { strict: false, timestamps: true, versionKey: false })

const model = mongoose.model('courseSchema', courseSchema, 'courses')

export default model 
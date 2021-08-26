const studentInformationModel = require('../models/studentInformation')
const professorInformationModel = require('../models/professorInformation')
const getter = require('../service/getters')

module.exports = {
    createStudentUser: (body) => {
        return new Promise((resolve, reject) => {
            const user = new studentInformationModel(body)
            user.save().then(data => {
                resolve({ success: true, message: "Successfully user Created" })
            }).catch(error => {
                reject({ success: false, message: "Internal server problem" })
            })
        })
    },
    createProfessorUser: (body) => {
        return new Promise((resolve, reject) => {
            const user = new professorInformationModel(body)
            user.save().then(data => {
                resolve({ success: true, message: "Successfully user Created" })
            }).catch(error => {
                reject({ success: false, message: "Internal server problem" })
            })
        })
    }
}
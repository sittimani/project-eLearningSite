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
    },
    getStudentUser: (request, response) => {
        const id = request.params.id;
        studentInformationModel.findOne({ userID: id }, (error, data) => {
            response.json(data)
        })
    },
    getProfessorUser: (request, response) => {
        const id = request.params.id;
        professorInformationModel.findOne({ userID: id }, (error, data) => {
            response.json(data)
        })
    },
    updateStudentUser: (request, response) => {
        const id = request.params.id;
        var body = request.body;
        body.userID = id;
        const value = getter.structureStudentData(body)
        studentInformationModel.findOneAndUpdate({userID: id}, value, {new: true}, (error, res) => {
            if(error){
                response.json({success: false, message: "Error in updating"})
            }else{
                response.json({success: true, message: "User Updated successfully",data: res})
            }
        })
    },
    updateProfessorUser: (request, response) => {
        const id = request.params.id;
        var body = request.body;
        body.userID = id;
        const value = getter.strucutureProfessorData(body)
        console.log(value)
        professorInformationModel.findOneAndUpdate({userID: id}, value, {new:true}, (error, res) => {
            if(error){
                response.json({success:false, message: "Error in updating"})
            }else{
                response.json({success: true, message: "User Updated successfully", data:res})
            }
        })
    }
}
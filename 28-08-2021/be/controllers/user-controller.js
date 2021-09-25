const studentInformationModel = require('../models/studentInformation')
const professorInformationModel = require('../models/professorInformation')
const professorAuth = require('../models/professorAuth')
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
        professorInformationModel.findOneAndUpdate({userID: id}, value, {new:true}, (error, res) => {
            if(error){
                response.json({success:false, message: "Error in updating"})
            }else{
                response.json({success: true, message: "User Updated successfully", data:res})
            }
        })
    },
    getPendingProfessor: (request, response) => {
        professorAuth.find({verified: 'pending'}, (error, data) => {
            if(error){
                response.json({success: false, message: "Internal server problem"})
            }else{
                response.json({success: true, message: "Successfully readed data", data: data})
            }
        })
    },
    userPermission: (request, response) => {
        const {id, verified} = request.body
        console.log(id, verified)
        professorAuth.updateOne({_id: id}, {$set: {verified:verified}}, (err,data)=> {
            if(err){
                response.json({success:false, message: "Internal Server Problem"})
            }else{
                response.json({success: true, message: "successfully approved"})
            }
        })
    }
}
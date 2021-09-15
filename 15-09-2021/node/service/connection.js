const mongoose = require('mongoose')
var _db;

module.exports = {
    connectToDB: async function () {
        const db = process.env.DB_ADDRESS + process.env.DBNAME
        const options = {
            socketTimeoutMS: 30000,
            keepAlive: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        return new Promise((resolve, reject) => {
            mongoose.connect(db, options, error => {
                if (error) {
                    reject(false)
                } else {
                    resolve(true)
                }
            })
        })
    },
}
global.mongoose = mongoose;
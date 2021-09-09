const mongoose = require('mongoose')
var _db;

module.exports = {
    connectToDB: async function () {
        const db = process.env.DB_ADDRESS + process.env.DBNAME

        return new Promise((resolve, reject) => {
            mongoose.connect(db, {useFindAndModify:false ,useNewUrlParser: true, useUnifiedTopology: true }, error => {
                if (error) {
                    reject(0)
                } else {
                    _db = db;
                    resolve(db)
                }
            })
        })
    },
}
global.mongoose = mongoose;
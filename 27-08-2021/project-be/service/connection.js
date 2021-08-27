const mongoose = require('mongoose')
var _db;

module.exports = {
    connectToDB: async function () {
        const db = 'mongodb://127.0.0.1:27017/' + process.env.DBNAME

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
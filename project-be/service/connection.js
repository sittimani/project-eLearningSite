const mongoose = require('mongoose')

module.exports = {
    connectToDB: async function (Dbname) {
        const db = 'mongodb://127.0.0.1:27017/' + Dbname

        return new Promise((resolve, reject) => {
            mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, error => {
                if (error) {
                    reject(0)
                } else {
                    resolve(db)
                }
            })
        })
    }
}
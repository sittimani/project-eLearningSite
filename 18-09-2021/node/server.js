require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connection = require("./service/connection")
const authRoute = require("./routes/auth-route")
const registerRoute = require("./routes/register-route")
const userRoute = require('./routes/user-route')
const courseRoute = require('./routes/course-route')
const qaRoute = require('./routes/qa-route')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.use('/uploads', express.static('uploads'))
app.use(authRoute)
app.use(registerRoute)
app.use(userRoute)
app.use(courseRoute)
app.use(qaRoute)

app.listen(port, async() => {
    console.log("Server running in port " + port)
    connection.connectToDB().then(resolve => {
        console.log("Connected to mongo")
    }, reject => {
        console.log("Not connected")
    })
})
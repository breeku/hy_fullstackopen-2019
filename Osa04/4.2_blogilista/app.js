require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./routes/blogs')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Connected')
}).catch((err) => {
    console.log(err)
})

module.exports = app
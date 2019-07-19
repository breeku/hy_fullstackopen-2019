require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./routes/blogs')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogRouter)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Connected')
}).catch((err) => {
    console.log(err)
})

module.exports = app
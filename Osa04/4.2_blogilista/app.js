const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./routes/blogs')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)

if (process.argv.length < 3) {
    console.log("give password as argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-j9z4e.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Connected')
}).catch((err) => {
    console.log(err)
})

module.exports = app
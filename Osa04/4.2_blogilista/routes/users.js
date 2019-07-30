const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response) => {
    try {
        const body = request.body

        if (!body.password || body.password.length < 3) {
            response.status(400).json({ error: "password too short" })
        } else {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash
            })

            const savedUser = await user.save()

            response.json(savedUser)
        }
    } catch (err) {
        if (err.name == "ValidationError") {
            response.status(400).json(err)
        }
        console.log(err)
    }
})

usersRouter.get("/", async (request, response) => {
    try {
        const users = await User.find({}).populate("blogs", {
            likes: 1,
            title: 1,
            author: 1,
            url: 1,
            id: 1
        })
        response.json(users.map(u => u.toJSON()))
    } catch (err) {
        console.log(err)
    }
})

module.exports = usersRouter

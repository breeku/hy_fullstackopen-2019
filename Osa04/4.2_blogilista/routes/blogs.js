const Blog = require("../models/blog")
const User = require("../models/user")
const blogRouter = require("express").Router()
const jwt = require("jsonwebtoken")

const getTokenFrom = request => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7)
    }
    return null
}

blogRouter.get("/", (request, response) => {
    Blog.find({})
        .populate("user", { username: 1, name: 1 })
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post("/", async (request, response) => {
    const body = request.body

    const token = getTokenFrom(request)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response
                .status(401)
                .json({ error: "token missing or invalid" })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            ...body,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog.toJSON())
    } catch (err) {
        if (err.name == "ValidationError") {
            response.status(400).json(err)
        } else if (err.name == "JsonWebTokenError") {
            response.status(400).json({ error: "invalid token" })
        }
        console.log(err)
    }
})

blogRouter.delete("/:id", async (request, response) => {
    const token = getTokenFrom(request)
    if (!token) {
        response.status(401).json({ error: "no token" })
    } else {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET)
            if (!token || !decodedToken.id) {
                return response
                    .status(401)
                    .json({ error: "token missing or invalid" })
            }

            const user = await User.findById(decodedToken.id)

            const blog = await Blog.findById(request.params.id)

            if (user && blog && user._id.toString() == blog.user.toString()) {
                await Blog.findByIdAndDelete(
                    request.params.id
                )
                response.status(200).end()
            } else {
                if (!blog) {
                    response.status(401).json({ error: "blog not found" })
                } else if (!user) {
                    response.status(401).json({ error: "user not found" })
                } else {
                    response.status(401).json({ error: "mismatch" })
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
})

blogRouter.put("/:id", async (request, response) => {
    try {
        blogUpdate = await Blog.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true }
        )
        response.status(201).json(blogUpdate.toJSON())
    } catch (err) {
        console.log(err)
        response.status(400)
    }
})

module.exports = blogRouter

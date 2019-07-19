const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get("/", (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogRouter.post("/", (request, response) => {
    const blog = new Blog(request.body)
    blog.save().then(result => {
        response.status(201).json(result)
    }).catch(err => {
        if (err.name == "ValidationError") {
            response.status(400).end()
        }
    })
})

blogRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id, (err, res) => {
        if (err) {
            console.log(err)
            response.status(404).end()
        } else if (res == null) {
            response.status(404).end()
        } else {
            response.status(200).end()
        }
    })
})

module.exports = blogRouter
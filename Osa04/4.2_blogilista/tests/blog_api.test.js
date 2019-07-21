const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect(a => expect(a.body.length).toBe(a.body.length))
})

test("there is a id", async () => {
    await api.get("/api/blogs").expect(a => expect(a.body[0].id).toBeDefined())
})

test("am able to POST and blog is added", async () => {
    example = {
        title: "Type wars",
        author: "Robect C. Martin",
        url: "http://google.com",
        likes: 32
    }
    blogs = await api.get("/api/blogs")
    blogCountBefore = blogs.body.length
    await api
        .post("/api/blogs")
        .send(example)
        .expect(201)
    await api
        .get("/api/blogs")
        .expect(a => expect(a.body.length).toBe(blogCountBefore + 1))
})

test("if no like field, likes are 0", async () => {
    example = {
        title: "Type wars",
        author: "Robect C. Martin",
        url: "http://google.com"
    }
    await api
        .post("/api/blogs")
        .send(example)
        .expect(201)
        .expect(a => expect(a.body.likes).toBe(0))
})

test("if no url or title, response with 400", async () => {
    example = {
        author: "Robect C. Martin"
    }
    await api
        .post("/api/blogs")
        .send(example)
        .expect(400)
})

test("am able to POST, then DELETE a blog", async () => {
    example = {
        title: "Type wars",
        author: "Robect C. Martin",
        url: "http://google.com"
    }
    blogPost = await api
        .post("/api/blogs")
        .send(example)
        .expect(201)
    await api.delete("/api/blogs/" + blogPost.body.id).expect(200)
})

test("am able to POST, then MODIFY a blog", async () => {
    example = {
        title: "Type wars",
        author: "Robect C. Martin",
        url: "http://google.com"
    }

    blogPost = await api
        .post("/api/blogs")
        .send(example)
        .expect(201)

    exampleModified = {
        title: "Wars type",
        author: "Martin R. Cobert",
        url: "http://duckduckgo.com",
        likes: 19
    }

    await api.put("/api/blogs/" + blogPost.body.id).send(exampleModified).expect(201)
})

afterAll(() => {
    mongoose.connection.close()
})

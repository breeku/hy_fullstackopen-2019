const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")

const api = supertest(app)

describe("blog post tests", () => {
    beforeAll(async () => {
        try {
            await User.deleteMany({})
            await api
                .post("/api/users")
                .send({ username: "root", password: "sekret" })

            loginUser = await api
                .post("/api/login")
                .send({ username: "root", password: "sekret" })

            loginToken = loginUser.body.token

            blogFull = {
                title: "Type wars",
                author: "Robect C. Martin",
                url: "http://google.com",
                likes: 32
            }
            blogNoLikes = {
                ...blogFull,
                likes: 0
            }
            blogNoTitleUrl = {}

            blogFullModified = {
                title: "Wars type",
                author: "Martin R. Cobert",
                url: "http://duckduckgo.com",
                likes: 19
            }
        } catch (err) {
            console.log(err)
        }
    })

    test("am able to POST and blog is added", async () => {
        blogs = await api.get("/api/blogs")
        blogCountBefore = blogs.body.length
        await api
            .post("/api/blogs")
            .set("Authorization", "bearer " + loginToken)
            .send(blogFull)
            .expect(201)
        await api
            .get("/api/blogs")
            .expect(a => expect(a.body.length).toBe(blogCountBefore + 1))
    })

    test("there is a id", async () => {
        await api
            .get("/api/blogs")
            .expect(a => expect(a.body[0].id).toBeDefined())
    })

    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect(a => expect(a.body.length).toBe(a.body.length))
    })

    test("if no like field, likes are 0", async () => {
        await api
            .post("/api/blogs")
            .set("Authorization", "bearer " + loginToken)
            .send(blogNoLikes)
            .expect(201)
            .expect(a => expect(a.body.likes).toBe(0))
    })

    test("if no url or title, response with 400", async () => {
        await api
            .post("/api/blogs")
            .set("Authorization", "bearer " + loginToken)
            .send(blogNoTitleUrl)
            .expect(400)
    })

    test("am able to POST, then DELETE a blog", async () => {
        blogPost = await api
            .post("/api/blogs")
            .set("Authorization", "bearer " + loginToken)
            .send(blogFull)
            .expect(201)

        await api
            .delete("/api/blogs/" + blogPost.body.id)
            .set("Authorization", "bearer " + loginToken)
            .expect(200)
    })

    test("am able to POST, then MODIFY a blog", async () => {
        blogPost = await api
            .post("/api/blogs")
            .set("Authorization", "bearer " + loginToken)
            .send(blogFull)
            .expect(201)

        await api
            .put("/api/blogs/" + blogPost.body.id)
            .send(blogFullModified)
            .expect(201)
    })
})
afterAll(() => {
    mongoose.connection.close()
})

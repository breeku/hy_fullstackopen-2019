const User = require("../models/user")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

//...

describe("when there is initially one user at db", () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: "root", password: "sekret" })
        await user.save()

        userOne = {
            username: "mluukkai",
            name: "Matti Luukkainen",
            password: "salainen"
        }

        userTwo = {
            username: "root",
            name: "Superuser",
            password: "salainen"
        }

        userThree = {
            username: "keikka",
            name: "Keijo Niinimaa",
            password: "onkyll"
        }

        userNoPass = {
            username: "Kyyli",
            name: "Kyllikki Kyy"
        }

        userNoUser = {
            name: "Veijo Teuvo",
            password: "teijoveijo"
        }

        userShortPass = {
            name: "Erkki Kiivi",
            username: "Erkiiv",
            password: "er"
        }

        userShortName = {
            name: "Erkki Kiivi",
            username: "Er",
            password: "erkiiv"
        }
    })

    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await api.get("/api/users")

        await api
            .post("/api/users")
            .send(userOne)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await api.get("/api/users")
        expect(usersAtEnd.body.length).toBe(usersAtStart.body.length + 1)

        const usernames = usersAtEnd.body.map(u => u.username)
        expect(usernames).toContain(userOne.username)
    })
    test("creation fails with proper statuscode and message if username already taken", async () => {
        const usersAtStart = await api.get("/api/users")

        const result = await api
            .post("/api/users")
            .send(userTwo)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.message).toContain("`username` to be unique")

        const usersAtEnd = await api.get("/api/users")
        expect(usersAtEnd.body.length).toBe(usersAtStart.body.length)
    })
    test("creation fails if there is no username and or password", async () => {
        await api
            .post("/api/users")
            .send(userNoPass)
            .expect(400)
        await api
            .post("/api/users")
            .send(userNoUser)
            .expect(400)
    })
    test("creation fails if username or password is too short", async () => {
        await api
            .post("/api/users")
            .send(userShortName)
            .expect(400)
            .expect(r => expect(r.body.message).toContain('is shorter than the minimum'))

        await api
            .post("/api/users")
            .send(userShortPass)
            .expect(400)
            .expect(r => expect(r.body.error).toContain("password too short")) // got message
    })
})

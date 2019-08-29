const blogs = [
    {
        id: "5a451df7571c224a31b5c8ce",
        title: "Type wars",
        author: "Robect C. Martin",
        url: "http://google.com",
        likes: 31,
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "mluukkai",
            name: "Matti Luukkainen",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBla3UiLCJpZCI6IjVkMzc1MjQyNTI2YTliNDBlMDc4YzI0NCIsImlhdCI6MTU2NzA5OTI1M30.3gBKI9G3O55lh2gmoz75qnP0MmmKDpdHr0lkwBBGv0I"
        }
    },
    {
        id: "5a451e21e0b8b04a45638211",
        title: "Type wars",
        author: "Robect C. Martin",
        url: "http://google.com",
        likes: 32,
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "mluukkai",
            name: "Matti Luukkainen",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBla3UiLCJpZCI6IjVkMzc1MjQyNTI2YTliNDBlMDc4YzI0NCIsImlhdCI6MTU2NzA5OTI1M30.3gBKI9G3O55lh2gmoz75qnP0MmmKDpdHr0lkwBBGv0I"
        }
    },
    {
        id: "5a451e30b5ffd44a58fa79ab",
        title: "Type wars",
        author: "Robect C. Martin",
        url: "http://google.com",
        likes: 36,
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "mluukkai",
            name: "Matti Luukkainen",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBla3UiLCJpZCI6IjVkMzc1MjQyNTI2YTliNDBlMDc4YzI0NCIsImlhdCI6MTU2NzA5OTI1M30.3gBKI9G3O55lh2gmoz75qnP0MmmKDpdHr0lkwBBGv0I"
        }
    }
]
let token = null

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = newToken => {
    token = `bearer ${newToken}`
}

export default { getAll, setToken }

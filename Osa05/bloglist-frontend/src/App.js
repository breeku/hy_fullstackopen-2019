import React, { useState, useEffect } from "react"
import Bloglist from "./components/Bloglist"
import loginService from "./services/login"
import blogs from "./services/blogs"
import Newblog from "./components/newBlog"

const App = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        console.log(loggedUserJSON)
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogs.setToken(user.token)
        }
    }, [])

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password
            })
            console.log(window.localStorage)
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            )
            console.log(window.localStorage)
            blogs.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
        } catch (exception) {
            console.log(exception)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogappUser")
    }

    const loginForm = () => (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    const loggedIn = () => (
        <div>
            <Newblog />
            <Bloglist />
        </div>
    )

    return (
        <div>
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>
                        {user.name} is logged in
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    {loggedIn()}
                </div>
            )}
        </div>
    )
}

export default App

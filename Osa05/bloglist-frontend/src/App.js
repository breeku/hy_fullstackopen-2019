import React, { useState, useEffect } from "react"
import Bloglist from "./components/Bloglist"
import loginService from "./services/login"
import blogs from "./services/blogs"
import Newblog from "./components/NewBlog"
import Notification from "./components/Notification"

const App = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
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
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            )
            blogs.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
            setSuccessMsg("Successfully logged in")
        } catch (exception) {
            if (exception.response) {
                setErrorMsg(exception.response.data.error)
                console.log(exception.response)
            } else {
                console.log(exception)
                setErrorMsg(exception)
            }
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
            <Notification
                successMsg={successMsg}
                setSuccessMsg={setSuccessMsg}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
            />
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

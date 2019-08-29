import React, { useState } from "react"
import blogService from "../services/blogs"
import Notification from "../components/Notification"

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const blogStyle = {
        marginTop: 10,
        marginLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    const clickableArea = {
        backgroundColor: "grey"
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const like = async () => {
        try {
            await blogService.update(blog.id, {
                ...blog,
                user: blog.user.id,
                likes: blog.likes + 1
            })
            setSuccessMsg("Succesfully liked a blog")
        } catch (e) {
            if (e.response) {
                console.log(e.response)
                setErrorMsg(e.response.data.message)
            } else {
                console.log(e)
                setErrorMsg(e)
            }
        }
    }

    const remove = async () => {
        if (
            window.confirm("remove blog " + blog.title + " by " + blog.author)
        ) {
            try {
                await blogService.remove(blog.id)
                setSuccessMsg("Succesfully removed the blog")
            } catch (e) {
                if (e.response) {
                    console.log(e.response)
                    setErrorMsg(e.response.data.message)
                } else {
                    console.log(e)
                    setErrorMsg(e)
                }
            }
        }
    }

    return (
        <div>
            <div>
                <Notification
                    successMsg={successMsg}
                    setSuccessMsg={setSuccessMsg}
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
                />
            </div>
            <div style={blogStyle}>
                <div href="#" onClick={toggleVisibility} style={clickableArea}>
                    {blog.title} by {blog.author}.
                </div>
                <div className="visible">
                    {visible ? (
                        <div>
                            <a href={blog.url}>{blog.url}</a>
                            <br />
                            {blog.likes} likes
                            <button onClick={like}>like</button>
                            <br />
                            added by
                            {blog.user ? (
                                <u>{blog.user.username}</u>
                            ) : (
                                <u>unknown</u>
                            )}
                            <br />
                            {JSON.parse(
                                window.localStorage.getItem("loggedBlogappUser")
                            ) !== null && blog.user.username ===
                            JSON.parse(
                                window.localStorage.getItem("loggedBlogappUser")
                            ).username ? (
                                    <button onClick={remove}>remove</button>
                                ) : (
                                    <div />
                                )}
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Blog

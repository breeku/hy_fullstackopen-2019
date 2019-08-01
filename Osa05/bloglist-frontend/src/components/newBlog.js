import React, { useState } from "react"
import blogService from "../services/blogs"
import Notification from "../components/Notification"
import Togglable from "../components/Togglable"

const Newblog = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const blogFormRef = React.createRef()

    const handlePost = async event => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        try {
            await blogService.create({
                title,
                author,
                url
            })
            setSuccessMsg(
                "Successfully posted " +
                    title +
                    ", with author " +
                    author +
                    " and a url of " +
                    url
            )
            setTitle("")
            setAuthor("")
            setUrl("")
        } catch (err) {
            setErrorMsg(err.response.data.message)
            console.log(err)
        }
    }
    return (
        <div>
            <Notification
                successMsg={successMsg}
                setSuccessMsg={setSuccessMsg}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
            />
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <div>
                    <form onSubmit={handlePost}>
                        <h2>Make a new blog</h2>
                        <div>
                            title
                            <input
                                name="title"
                                type="text"
                                value={title}
                                onChange={({ target }) =>
                                    setTitle(target.value)
                                }
                            />
                        </div>
                        <div>
                            author
                            <input
                                name="author"
                                type="text"
                                value={author}
                                onChange={({ target }) =>
                                    setAuthor(target.value)
                                }
                            />
                        </div>
                        <div>
                            url
                            <input
                                name="url"
                                type="text"
                                value={url}
                                onChange={({ target }) => setUrl(target.value)}
                            />
                        </div>
                        <button type="submit">post</button>
                    </form>
                </div>
            </Togglable>
        </div>
    )
}

export default Newblog

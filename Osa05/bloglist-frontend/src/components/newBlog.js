import React, { useState } from "react"
import blogService from "../services/blogs"
import Notification from "../components/Notification"
import Togglable from "../components/Togglable"
import { useField } from "../hooks"

const Newblog = () => {
    const title = useField("text")
    const resetTitle = title.resetValue
    const author = useField("text")
    const resetAuthor = author.resetValue
    const url = useField("text")
    const resetUrl = url.resetValue
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    delete title.resetValue
    delete author.resetValue
    delete url.resetValue

    const blogFormRef = React.createRef()

    const handlePost = async event => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        try {
            await blogService.create({
                title: title.value,
                author: author.value,
                url: url.value
            })
            setSuccessMsg(
                "Successfully posted " +
                    title +
                    ", with author " +
                    author +
                    " and a url of " +
                    url
            )
            resetTitle()
            resetAuthor()
            resetUrl()
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
                                {...title}
                            />
                        </div>
                        <div>
                            author
                            <input
                                {...author}
                            />
                        </div>
                        <div>
                            url
                            <input
                                {...url}
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

import React, { useState } from "react"
import blogService from "../services/blogs"

const Newblog = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handlePost = async event => {
        event.preventDefault()
        console.log("handlepost")
        try {
            await blogService.create({
                title,
                author,
                url
            })
            setTitle("")
            setAuthor("")
            setUrl("")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <form onSubmit={handlePost}>
            <h2>Make a new blog</h2>
            <div>
                title
                <input
                    name="title"
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                    name="author"
                    type="text"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
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
    )
}

export default Newblog

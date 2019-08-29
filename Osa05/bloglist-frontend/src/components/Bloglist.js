import React, { useState, useEffect } from "react"
import Blog from "./Blog"
import blogService from "../services/blogs"

const Bloglist = () => {
    const [blogs, setBlogs] = useState([{}])

    useEffect(() => {
        let fetchBlogs = async () => {
            const blogArray = await blogService.getAll()
            setBlogs(blogArray)
        }
        fetchBlogs()
    }, [])

    return (
        <div>
            {blogs ? (
                blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog => <Blog blog={blog} key={blog.id}/>)
            ) : (
                <div />
            )}
        </div>
    )
}

export default Bloglist

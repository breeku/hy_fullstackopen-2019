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

    return blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
            <li key={blog.id}>
                <Blog blog={blog} />
            </li>
        ))
}

export default Bloglist

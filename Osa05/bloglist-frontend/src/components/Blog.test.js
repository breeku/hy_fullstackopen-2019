import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

afterEach(cleanup)

test("default view", () => {
    const blog = {
        title: "Testi",
        author: "bre",
        likes: 10,
    }

    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent("Testi by bre.")
})

test("view after clicking area", () => {
    const blog = {
        title: "Testi",
        author: "bre",
        likes: 10,
        url: "url",
    }

    const component = render(<Blog blog={blog} />)

    const button = component.getByText("Testi by bre.")
    fireEvent.click(button)

    const main = component.container.querySelector(".visible")
    expect(main).toHaveTextContent("url10 likeslikeadded byunknown")
})

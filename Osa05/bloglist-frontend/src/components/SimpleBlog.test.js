import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "@testing-library/react"
import SimpleBlog from "./SimpleBlog"

afterEach(cleanup)

test("renders content", () => {
    const blog = {
        title: "Testi",
        author: "bre",
        likes: 10
    }

    const component = render(<SimpleBlog blog={blog} />)

    const main = component.container.querySelector(".main")
    expect(main).toHaveTextContent("Testi bre")

    const likes = component.container.querySelector(".likes")
    expect(likes).toHaveTextContent("10")
})

test("button functions", () => {
    const blog = {
        title: "Testi",
        author: "bre",
        likes: 10
    }
    const mockHandler = jest.fn()

    const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

    const button = getByText("like")
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})
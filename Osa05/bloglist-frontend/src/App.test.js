import React from "react"
import { render, waitForElement } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
jest.mock("./services/blogs")
import App from "./App"

describe("<App />", () => {
    test("if no user logged, blogs are not rendered", async () => {
        const component = render(<App />)
        component.rerender(<App />)

        await waitForElement(() => component.getByText("login"))

        const element = component.getByText("Log in to application")
        expect(element).toBeDefined()
    })

    test("user is logged in, blogs are rendered", async () => {
        const user = {
            username: "tester",
            token: "1231231214",
            name: "Donald Tester"
        }

        localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
        const component = render(<App />)
        component.rerender(<App />)

        await waitForElement(() => component.getByText("Donald Tester is logged in"))
        const element = component.getByText("Donald Tester is logged in")
        expect(element).toBeDefined()

        const blog = component.getAllByText("Type wars by Robect C. Martin.")
        expect(blog).toBeDefined()
    })
})

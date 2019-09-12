import React from "react"
import { connect } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationFormChange } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        props.createAnecdote(content)
        props.notificationFormChange("Created a anecdote '" + content + "'", 5)
    }
    return (
        <div>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}


export default connect(
    null,
    { createAnecdote, notificationFormChange }
  )(AnecdoteForm)
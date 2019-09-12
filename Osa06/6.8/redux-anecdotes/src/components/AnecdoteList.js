import React from "react"
import { connect } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notificationVoteChange } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    //console.log(anecdotes)
    anecdotes.sort((a, b) => (a.votes < b.votes ? 1 : -1))

    const vote = anecdote => {
        props.voteAnecdote(anecdote)
        props.notificationVoteChange("Created a anecdote with id " + anecdote.id + ".", 5)
    }

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = { voteAnecdote, notificationVoteChange }

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdotes

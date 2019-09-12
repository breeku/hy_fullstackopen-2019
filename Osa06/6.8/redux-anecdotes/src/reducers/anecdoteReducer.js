import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
    //console.log("state now: ", state)
    //console.log("action", action)

    if (action.type === "VOTE") {
        const id = action.data.id
        const anecdoteToVote = state.find(n => n.id === id)
        const changedAnecdote = {
            ...anecdoteToVote,
            votes: anecdoteToVote.votes + 1
        }

        return state.map(anecdote =>
            anecdote.id !== id ? anecdote : changedAnecdote
        )
    } else if (action.type === "NEW_ANECDOTE") {
        return [...state, action.data]
    } else if (action.type === "INIT_ANECDOTES") {
        return action.data
    } else {
        return state
    }
}

export const voteAnecdote = content => {
    content = {...content, votes: content.votes + 1}
    return async dispatch => {
        await anecdoteService.voteAnecdote(content)
        dispatch({
            type: "VOTE",
            data: content
        })
    }
}

export const createAnecdote = content => {
    let addedVotes = {content, votes: 0}
    return async dispatch => {
        let response = await anecdoteService.createNew(addedVotes)
        let addedId = {...addedVotes, id: response.id}
        dispatch({
            type: "NEW_ANECDOTE",
            data: addedId
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({ type: "INIT_ANECDOTES", data: anecdotes })
    }
}

export default anecdoteReducer

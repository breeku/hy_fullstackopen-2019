const notificationReducer = (state = null, action) => {
    //console.log(action)
    //console.log(state)
    if (action.type === "VOTE_NOTIFICATION") {
        return action.data
    } else if (action.type === "NEW_ANECDOTE_NOTIFICATION") {
        return action.data
    } else if (action.type === "EMPTY_NOTIFICATION") {
        return null
    } else {
        return state
    }
}

export const notificationVoteChange = (message, duration) => {
    return {
        type: "VOTE_NOTIFICATION",
        data: {message, duration}
    }
}

export const notificationFormChange = (message, duration) => {
    return {
        type: "NEW_ANECDOTE_NOTIFICATION",
        data: {message, duration}
    }
}

export const emptyNotification = () => {
    return {
        type: "EMPTY_NOTIFICATION"
    }
}

export default notificationReducer
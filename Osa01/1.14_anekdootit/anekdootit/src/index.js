import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = {
    0: {
        text: 'If it hurts, do it more often',
        points: 0
    },
    1: {
        text: 'Adding manpower to a late software project makes it later!',
        points: 0
    },
    2: {
        text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        points: 0
    },
    3: {
        text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        points: 0
    },
    4: {
        text: 'Premature optimization is the root of all evil.',
        points: 0
    },
    5: {
        text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        points: 0
    }
    }

const Button = ({klikkaa, text}) => (
    <button onClick={klikkaa}>{text}</button>
)

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

const Mostvotes = () => {
    var mostPoints = anecdotes[0].points
    for (var i in anecdotes) {
        if (i > mostPoints) {
            i = mostPoints
        }
    }
    return (
        <div>
            <p>{anecdotes[i].text}</p>
        <div>
            <p>has {i} votes</p>
        </div>
        </div>
    )
}

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0)
    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected].text}
        <div>
            <p>Has votes {anecdotes[selected].points}</p>
        </div>
        <div>
            <Button klikkaa={() => anecdotes[selected].points += 1} text="vote"/>
            <Button klikkaa={() => setSelected(getRandomInt(5))} text="next anecdote"/>
        </div>
        <div>
            <h1>Anecdote with most votes</h1>
            <Mostvotes/>
        </div>
        </div>
    )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

const Button = ({klikkaa, text}) => (
    <button onClick={klikkaa}>{text}</button>
)

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

const Mostvotes = ({points, anecdotes}) => {
    let max = points[0].reduce(function(a, b) {
        return Math.max(a, b);
    });
    let text = points[0].findIndex(i => i === max);
    return (
        <div>
            <p>{anecdotes[text]}</p>
        <div>
            <p>has {max} votes</p>
        </div>
        </div>
    )
}


const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState([new Array(5).fill(0)])

    const handleVote = (i) => {
        const copy = {...points}
        copy[0][i] += 1
        setPoints(copy)
    }
    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
        <div>
            <p>has {points[0][selected]} votes</p>
        </div>
        <div>
            <Button klikkaa={() => handleVote(selected)} text="vote"/>
            <Button klikkaa={() => setSelected(getRandomInt(5))} text="next anecdote"/>
        </div>
        <div>
            <h1>Anecdote with most votes</h1>
            <Mostvotes points={points} anecdotes={anecdotes}/>
        </div>
        </div>
    )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
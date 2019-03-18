import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({g, n, b}) => {
    if (g + n + b === 0) {
        return (
            <div>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    } else {
    return (
        <div>
            <h1>statistiikka</h1>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{g}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{n}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{b}</td>
                    </tr>
                    <tr>
                        <td>yhteensä</td>
                        <td>{g + n + b}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{(g * 1 + n * 0 + b * -1) / (g + n + b)}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{g / (g + n + b) *100}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
    }
}

const Button = ({klikkaa, text}) => (
    <button onClick={klikkaa}>{text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>anna palautetta</h1>
        <Button klikkaa={() => setGood(good + 1)} text="hyvä"/>
        <Button klikkaa={() => setNeutral(neutral + 1)} text="neutraali"/>
        <Button klikkaa={() => setBad(bad + 1)} text="huono"/>
        <Statistics g={good} n={neutral} b={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
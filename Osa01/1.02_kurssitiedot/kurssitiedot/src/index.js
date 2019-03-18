import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  const Header = () => {
      return (
          <div>
              <h1>{course}</h1>
          </div>
      )
  }

  const Part = ({p, e}) => {
    return (
        <div>
            <p>{p} {e}</p>
        </div>
    )
  }

  const Content = () => {
      return (
          <div>
            <Part p={part1} e={exercises1}/>
            <Part p={part2} e={exercises2}/>
            <Part p={part3} e={exercises3}/>
          </div>
      )
  }

  const Total = () => {
      return (
          <div>
              <p>yhteensä {exercises1 + exercises2 + exercises3} tehtävää</p>
          </div>
      )
  }

  return (
    <div>
      <Header/>
      <Content/>
      <Total/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
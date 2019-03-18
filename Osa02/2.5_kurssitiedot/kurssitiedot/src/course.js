import React from 'react'

const Course = ({course}) => {
    const Header = () => {
        const result = course.map(c => <li key={c.id}>{c.name}</li>)
        return (
            <div>
                <h1>{result}</h1>
            </div>
        )
    }
  
    const Content = () => {
        const result = course.map(c => c.parts.map(p => <li key={p.id}>{p.name}, {p.exercises}</li>))
        return (
            <div>
              {result}
            </div>
        )
    }

    const Exercises = () => {
        const result = course.map(c => c.parts.map(p => p.exercises))
        var initialValue = 0
        var sum = result.reduce( (s, p) => {
            return p
        }, initialValue)
        return (
            <p>Yhteensä {sum} tehtävää</p>
        )
    }
  
    const Total = () => {
        return (
            <div>
                <Exercises/>
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

export default Course
import React from 'react'

const Header = ({n, c}) => {
    const contents = () => c.parts.map(part => <Content key={part.id} n={part.name} p={part.exercises}/>)
    let sum = 0
    const total = c.parts.reduce( (s, p) => {
        if (!s.exercises) {
            sum += p.exercises
            return sum
        }
        sum += s.exercises + p.exercises
        return sum
      })
    return (
        <div>
            <h1>{n}</h1>
            {contents()}
            {total}
        </div>
    )
}

const Content = ({n, p}) => {
    return (
        <div>
          <p>{n} {p}</p>
        </div>
    )
}

const Course = ({course}) => {
    const headers = () => course.map(name => <Header key={name.id} n={name.name} c={name}/>)
    return (
        <div>
            {headers()}
        </div>
    )

}

export default Course
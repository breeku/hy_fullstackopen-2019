import React, { useState } from 'react'

const Names = ({name, number}) => {
  return (
    <div>
      <p>{name} : {number}</p>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(s => s.name == newName)) {
      window.alert(newName + ' on jo luettelossa')
    } else {
      setPersons([
        ...persons, 
        {
          id: persons.length + 1,
          name: newName,
          number: newNumber
        }
      ])
    }
    console.log(persons)
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumero = (event) => {
    setNewNumber(event.target.value)
  }

  const rows = () => persons.map(n => 
    <Names key={n.id} name={n.name} number={n.number}/>
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        <div>
          nimi: <input
          value={newName}
          onChange={handleChangeName}
          />
          numero: <input
          value={newNumber}
          onChange={handleChangeNumero}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )

}

export default App
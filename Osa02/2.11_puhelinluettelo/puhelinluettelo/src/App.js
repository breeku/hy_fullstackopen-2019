import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Names = ({name, number}) => {
  return (
    <div>
      <p>{name} : {number}</p>
    </div>
  )
}

const Filter = ({s, h}) => {
  return (
    <div>
      rajaa näytettäviä
      <input
        value={s}
        onChange={h}
      />
    </div>
  )
}

const Lisaa = ({name, hName, number, hNumber, submit}) => {
  return (
    <form onSubmit={submit}>
      <h2>Lisää uusi</h2>
      <div>
        nimi: <input
        value={name}
        onChange={hName}
        />
        numero: <input
        value={number}
        onChange={hNumber}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const Rows = ({n}) => {
  const rows = () => n.map(n => 
    <Names key={n.id} name={n.name} number={n.number}/>
  )

  return (
    <div>
      <h2>Numerot</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState()
  const [ showAll, setShowAll ] = useState(true)
  const namesToShow = showAll ? persons : persons.filter(n => n.name.toLowerCase().includes(searchName.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(s => s.name === newName)) {
      window.alert(newName + ' on jo luettelossa.')
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
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    if (searchName === "") {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
        <Filter s={searchName} h={handleSearchName} />
        <Lisaa name={newName} hName={handleChangeName} number={newNumber} hNumber={handleChangeNumber} submit={addName} />
        <Rows n={namesToShow}/>
    </div>
  )

}

export default App
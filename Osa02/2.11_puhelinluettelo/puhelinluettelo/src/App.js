import React, { useState } from 'react'

/////////////////////////////////
// TODO: SPLIT INTO COMPONENTS //
/////////////////////////////////

const Names = ({name, number}) => {
  return (
    <div>
      <p>{name} : {number}</p>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState()
  const [ showAll, setShowAll ] = useState(true)
  const namesToShow = showAll ? persons : persons.filter(n => n.name.toLowerCase().includes(searchName.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(s => s.name == newName)) {
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

  const handleChangeNumero = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    if (searchName == "") {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  const rows = () => namesToShow.map(n => 
    <Names key={n.id} name={n.name} number={n.number}/>
  )

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <div>
        rajaa näytettäviä
        <input
          value={searchName}
          onChange={handleSearchName}
        />
      </div>
      <h2>Lisää uusi</h2>
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
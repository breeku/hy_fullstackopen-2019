import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Names = ({name, number, id}) => {
  const removePerson = () => {
    if (window.confirm('Poistetaanko ' + name + ' jonka id on ' + id + " ?"))
      personService
        .remove(id) // mb just remove content of the said id, otherwise breaks id = persons.length + 1
        .then(r => {
          window.location.reload(); // bad way
        })
    }

  return (
    <div>
      <p>{name} : {number} <button onClick={removePerson}>poista</button></p>
    </div>
  )
}

const Rows = ({n}) => {
  const rows = () => n.map(n => 
    <Names key={n.id} name={n.name} number={n.number} id={n.id}/>
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

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const filteredPersons = showAll ? persons : persons.filter(n => n.name.toLowerCase().includes(searchName.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(p => {
        console.log('promise fulfilled')
        setPersons(p)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(s => s.name === newName)) {
      if (window.confirm(newName + ' on jo luettelossa, korvataanko vanha numero uudella?')){
        const personId = persons.findIndex(s => s.name === newName) + 1
        const personObject = {
          name: newName,
          number: newNumber
        }
        personService
          .update(personId, personObject)
          .then(n => {
            window.location.reload(); // bad way
          })
      }
    } else {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(n => {
          setPersons(persons.concat(n))
          setNewName('')
          setNewNumber('')
        })
      //setPersons([
      //  ...persons, 
      //  {
      //    id: persons.length + 1,
      //    name: newName,
      //    number: newNumber
      //  }
      //])
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
        <Rows n={filteredPersons}/>
    </div>
  )

}

export default App
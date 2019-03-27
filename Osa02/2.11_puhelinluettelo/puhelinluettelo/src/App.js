import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Names = ({na, nu, id, obj, notification}) => {
  const [name, setName] = useState(na)
  const [number, setNumber] = useState(nu)
  const [persons, setPersons] = useState(obj)
  const removePerson = ({a}) => {
    console.log(a)
    if (window.confirm('Poistetaanko ' + name + ' jonka id on ' + id + " ?"))
      personService
        .remove(id)
        .then(r => {
          notification(`${name}..poistettiin onnistuneesti.`)
          setName('')
          setNumber('')
          setPersons(persons.pop())
        }).catch(error => {
          notification(`${name} ...virhe? ${error}`)
          setTimeout(() => {notification(null)}, 5000)
        })
    }
  const o = name && number !== "" ? <p>{name} : {number} <button onClick={removePerson}>poista</button></p> : null // :D

  return (
    <div>
      {o}
    </div>
  )
}

const Rows = ({n, notification}) => {
  const rows = () => n.map(a => 
    <Names key={a.id} na={a.name} nu={a.number} id={a.id} obj={n} notification={notification}/> // obj{n} JA notification menee n.length verran Names komponenttiin.. ei hyvä
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

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState('')
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
    const findName = filteredPersons.find(s => s.name === newName)
    const maxId = filteredPersons.length > 0
      ? Math.max(...filteredPersons.map(n => n.id)) 
      : 0
    const minId = filteredPersons.length > 0
      ? Math.min(...filteredPersons.map(n => n.id))
      : 0
    if (findName) {
      const personId = filteredPersons.length > 0 
        ? filteredPersons.find(n => n.id === findName.id).id
        : minId
      console.log(`max: ${maxId} | min: ${minId} | person : ${newName} | personId: ${personId}`)
      if (window.confirm(newName + ' on jo luettelossa, korvataanko vanha numero uudella?')){
        const personObject = {
          id: personId,
          name: newName,
          number: newNumber
        }
        personService
          .update(personId, personObject)
          .then(n => {
            setErrorMessage(`${newName} ..n päivitys onnistui!`)
            const copy = [...persons]
            copy.splice(personId - 1, 1, n)
            setPersons([]) // jos suoraan tekee alemman, dom ei päivity
            setPersons(copy)
            setNewName('')
            setNewNumber('')
          }).catch(error => {
            setErrorMessage(`${newName} ...virhe? ${error}`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
      }
    } else {
      const personObject = {
        id: maxId + 1,
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(n => {
          setErrorMessage(`Lisättiin.. ${newName}`)
          setPersons(persons.concat(n))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setErrorMessage(`${newName} ...virhe? ${error}`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
        })
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
    if (event.target.value === "") { // jos käyttää searchName === "" tulee domin päivitys aina yhden "kirjaimen" myöhässä
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification message={errorMessage} />
        <Filter s={searchName} h={handleSearchName} />
        <Lisaa name={newName} hName={handleChangeName} number={newNumber} hNumber={handleChangeNumber} submit={addName} />
        <Rows n={filteredPersons} notification={setErrorMessage}/>
    </div>
  )

}

export default App
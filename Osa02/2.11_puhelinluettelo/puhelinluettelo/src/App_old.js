import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Rows = ({n, err, suc, setPersons}) => {
  const removePerson = (c) => {
    if (window.confirm('Poistetaanko ' + c.name + ' jonka id on ' + c.id + " ?"))
    personService
      .remove(c.id)
      .then(r => {
        suc(`${c.name} poistettiin onnistuneesti.`)
        const copy = [...n]
        copy.splice(c.id - 1, 1)
        setPersons(copy)
      }).catch(error => {
        err(`${c.name} ...virhe? ${error}`)
        setTimeout(() => {err(null)}, 5000)
    })
    }

  const rows = () => n.map(a => 
    <li key={a.id}>
      <p>{a.name} : {a.number} 
      <button onClick={() => removePerson(a)}>poista</button>
      </p>
    </li>
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

const Notification = ({errMessage, sucMessage}) => {
  if (errMessage === null && sucMessage === null) {
    return null
  }

  if (errMessage) {
    return (
      <div className="error">
        {errMessage}
      </div>
    )
  } else {
    return (
      <div className="success">
        {sucMessage}
      </div>
    )
  }
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState('')
  const filteredPersons = showAll ? persons : persons.filter(n => n.name.toLowerCase().includes(searchName.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(p => {
        setPersons(p)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const findName = filteredPersons.find(s => s.name === newName)
    if (findName) {
      const personId = findName.id
      if (window.confirm(newName + ' on jo luettelossa, korvataanko vanha numero uudella?')){
        const personObject = {
          id: personId,
          name: newName,
          number: newNumber
        }
        personService
          .update(personId, personObject)
          .then(n => {
            setSuccessMessage(`${newName} n päivitys onnistui!`)
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
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(n => {
          setSuccessMessage(`Lisättiin ${newName}`)
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
      <Notification errMessage={errorMessage} sucMessage={successMessage} />
        <Filter s={searchName} h={handleSearchName} />
        <Lisaa name={newName} hName={handleChangeName} number={newNumber} hNumber={handleChangeNumber} submit={addName} />
        <Rows setPersons={setPersons} n={filteredPersons} err={setErrorMessage} suc={setSuccessMessage}/>
    </div>
  )

}

export default App
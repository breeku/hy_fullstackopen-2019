import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import "./index.css";

const Ilmoitus = ({ errorMessage, successMessage }) => {
    if (errorMessage === null && successMessage === null) {
        return null;
    }
    if (errorMessage) {
        return <div className="error">{errorMessage}</div>;
    } else {
        return <div className="success">{successMessage}</div>;
    }
};

const Numerot = ({ persons, removePerson }) => {
    console.log(persons)
    return persons.map(person => (
        <li key={person.id}>
            <p>
                {person.name} : {person.number}
                <button className="poista" onClick={() => removePerson(person)}>
                    poista
                </button>
            </p>
        </li>
    ));
};

const Lisaa = ({
    handleNameChange,
    handleNumberChange,
    addPerson,
    name,
    number
}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                nimi: <input value={name} onChange={handleNameChange} />
            </div>
            <div className="lisaa">
                numero: <input value={number} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    );
};

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [persons, setPersons] = useState([]);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [searchFilter, setSearchFilter] = useState("");

    const handleNameChange = event => setName(event.target.value);
    const handleNumberChange = event => setNumber(event.target.value);
    const handleFilter = event => setSearchFilter(event.target.value);

    useEffect(() => {
        personService.getAll().then(data => {
            setPersons(data);
        });
    }, []);

    const removePerson = person => {
        if (
            window.confirm(
                "Poistetaanko " +
                    person.name +
                    " jonka id on " +
                    person.id +
                    " ?"
            )
        )
            personService
                .remove(person.id)
                .then(response => {
                    setSuccessMessage(
                        `${person.name} poistettiin onnistuneesti.`
                    );
                    setPersons(persons.filter(p => p.id !== person.id));
                })
                .catch(error => {
                    setErrorMessage(`${person.name} virhe. ${error}`);
                    setTimeout(() => {
                        errorMessage(null);
                    }, 5000);
                });
    };

    const addPerson = event => {
        event.preventDefault();
        const findName = filteredPersons.find(s => s.name === name);
        if (findName) {
            /*
            const personId = findName.id;
            if (
                window.confirm(
                    name +
                        " on jo luettelossa, korvataanko vanha numero uudella?"
                )
            ) {
                const personObject = {
                    id: personId,
                    name: name,
                    number: number
                };
                personService
                    .update(personId, personObject)
                    .then(n => {
                        setSuccessMessage(`${name} n päivitys onnistui!`);
                        const copy = [...persons];
                        copy.splice(personId - 1, 1, n);
                        setPersons([]); // jos suoraan tekee alemman, dom ei päivity
                        setPersons(copy);
                        setName("");
                        setNumber("");
                    })
                    .catch(error => {
                        setErrorMessage(`${name} ...virhe? ${error}`);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    });
            } */
        } else {
            const personObject = {
                name,
                number
            };
            personService
                .create(personObject)
                .then(id => {
                    personObject.id = id;
                    setSuccessMessage(`Lisättiin ${name}`);
                    let copy = [...persons.concat(personObject)];
                    setPersons(copy);
                    setName("");
                    setNumber("");
                })
                .catch(error => {
                    console.log(error);
                    setErrorMessage(`${name} virhe. ${error}`);
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                });
        }
    };

    const filteredPersons =
        searchFilter.length === 0
            ? persons
            : persons.filter(p =>
                  p.name.toLowerCase().includes(searchFilter.toLowerCase())
              );

    return (
        <div>
            <h1>Puhelinluettelo</h1>
            <Ilmoitus
                errorMessage={errorMessage}
                successMessage={successMessage}
            />
            <h3>Rajaa näytettäviä</h3>
            <input value={searchFilter} onChange={handleFilter} />

            <h3>Lisää uusi</h3>
            <Lisaa
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}
                name={name}
                number={number}
            />

            <h3>Numerot</h3>
            <Numerot persons={filteredPersons} removePerson={removePerson} />
        </div>
    );
};

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

const FindCountries = () => {
  const [data, setData] = useState([{name: ''}]);
  const [searchCountry, setSearchCountry] = useState('')
  const dataToShow = data.filter(n => n.name.toLowerCase().includes(searchCountry.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setData(response.data)
      })
  }, [])

  const countries = () => {
  console.log(dataToShow.length)
  if (dataToShow.length >= 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (dataToShow.length == 1 && searchCountry != "") {
    return (
      <OneCountry obj={dataToShow[0]}/>
    )
  } else {
    return (
      dataToShow.map(n => <Countries key={n.id} name={n.name}/>)
    )
  }
  }

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      find countries 
      <input
          value={searchCountry}
          onChange={handleSearchCountry}
      />
    <ul>
      {countries()}
    </ul>
    </div>
  )
}

const Countries = ({name}) => {
  return (
    <p>{name}</p>
  )
}

const OneCountry = ({obj}) => {
  const l = () => obj.languages.map(x => <li>{x.name}</li>)
  return (
  <div>
    <h1>{obj.name}</h1>
    <p>Capital: {obj.capital}</p>
    <p>Population: {obj.population}</p>
    <h2>Languages</h2>
    {l()}
    <img src={obj.flag} width="300px"></img>
  </div>
  )
}

const App = () => {
  return (
    <div>
      <FindCountries/>
    </div>
  );
}


export default App;

import logo from './logo.svg';
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
function App() {
  const [ countries, setCountries ] = useState([])

  useEffect( () => {

    const getCountriesData = async () => {
      
      await fetch('https://disease.sh/v3/covid-19/countries/').
    then((resp) => resp.json())
    .then((data) => { 
         const countries = data.map( (country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
         ));
          setCountries(countries);
        });

      }

      getCountriesData();

  }, [])

  return (
    <div className="app">
      <div class="app__header">
      <h1>COVITRAX</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value="abc"
        >

          {countries.map( (country) => {
           return <MenuItem value={country.value}>{country.name}</MenuItem>
          } )}

        </Select>

      </FormControl>

      </div>
      {/* Header */}
      {/* Dropdown Select */}
      {/* InfoBox */}
      {/* InfoBox */}
      {/* InfoBox */}
      {/* Table */}
      {/* Graph */}
      {/* Map */}

    </div>
  );
}

export default App;

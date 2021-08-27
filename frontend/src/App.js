
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
  const [ countries, setCountries ] = useState([])
  const [ country, setCountry ] = useState("")

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


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode)
    setCountry(countryCode) 
  }

  return (
    <div className="app">
      <div className="app__left">

      <div className="app__header">
      <h1>COVITRAX</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value={country}
          onChange={onCountryChange}
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map( (country) => {
           return <MenuItem value={country.value}>{country.name}</MenuItem>
          } )}

        </Select>

      </FormControl>

      </div>

      < div className="app__stats">
      <InfoBox title="new cases" cases={143} total={2000}></InfoBox>
      <InfoBox title="recovered" cases={143} total={2000}></InfoBox>
      <InfoBox title="deaths" cases={143} total={2000}></InfoBox>
      </div>

      <Map></Map>

      </div>

      <div className="app__right">
      <Card >
            <CardContent>
              <h3>LIve cases by country</h3>
              <h3>Worldwide New cases</h3>

            </CardContent>
        </Card>          
        {/* Graph */}

      </div>

    </div>
  );
}

export default App;

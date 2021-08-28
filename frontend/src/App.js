
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ country, setCountry ] = useState("");
  const [ countryInfo, setCountryInfo ] = useState({country: "empty"});

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

  useEffect( () => {
    // upon first load, load data for worldwide, to be used by map and table and stat boxes
    fetch('https://disease.sh/v3/covid-19/all')
    .then( (resp) => resp.json() )
    .then( (data) => {
      console.log(data)
      setCountryInfo(data)

    });


  }, [])



  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode)
    const url = countryCode === 'worldwide' ? `https://disease.sh/v3/covid-19/countries` : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then( (resp) => resp.json() )
    .then( (data) => {
      console.log(data)
      setCountry(countryCode) 
      setCountryInfo(data)

    });

    console.log("country info is", countryInfo)


  }

  return (
    <div className="app">
      <div className="app__left">

      <div className="app__header">
      <h1>COVITRAK</h1>
      <p>current country code: {country}</p>
      <p>current country: {countryInfo.country}</p>

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
      {/* "todayCases": 47,
    "deaths": 7103,
    "todayDeaths": 2,
    "recovered": 109626,
    "todayRecovered": 0,
    "active": 36278, */}

      < div className="app__stats">
      <InfoBox title="new cases" cases={countryInfo.todayCases} total={countryInfo.cases}></InfoBox>
      <InfoBox title="recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></InfoBox>
      <InfoBox title="deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></InfoBox>
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

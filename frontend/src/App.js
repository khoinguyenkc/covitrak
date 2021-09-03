
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import ResourcePanel from './ResourcePanel';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";


function App() {
  const [ countries, setCountries ] = useState([]);
  const [ mapCountries, setMapCountries ] = useState([]);

  const [ country, setCountry ] = useState("worldwide");
  const [ countryInfo, setCountryInfo ] = useState({country: "empty"});
  const [ casesType, setCasesType ] = useState("cases")
  const [ tableData, setTableData ] = useState([]);
  const [ mapCenter, setMapCenter ] = useState( {lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  useEffect( () => {

    const getCountriesData = async () => {
      
      await fetch('https://disease.sh/v3/covid-19/countries/').
    then((resp) => resp.json())
    .then((data) => { 
        //we do 3 seprate things, they're not steps 

        //store raw data for map
        setMapCountries(data);

        //strip down data to make a very basic list of country codes
         const countries = data.map( (country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
         ));
          setCountries(countries);

          //sort data to ranked list

          const sortedData = sortData(data)
          setTableData(sortedData);

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
      // change map center
      setMapCenter({lat: data.countryInfo.lat, lng: data.countryInfo.long})
      setMapZoom(4);
    });

    console.log("country info is", countryInfo)


  }

  return (
    <div className="app">
      <div className="app__left">

      <div className="app__header">
      <h1>COVITRAK</h1>
      {/* <p>current country code: {country}</p>
      <p>current country: {countryInfo.country}</p> */}
      <div>
      <span>Select a country: </span>
      <FormControl className="app__dropdown">
        <Select
          className="dropdown-item"
          variant="outlined"
          value={country}
          onChange={onCountryChange}
        >
          <MenuItem className="dropdown-item" value="worldwide">Worldwide</MenuItem>
          {countries.map( (country) => {
           return <MenuItem className="dropdown-item" value={country.value}>{country.name}</MenuItem>
          } )}

        </Select>

      </FormControl>

      </div>

      </div>
      {/* "todayCases": 47,
    "deaths": 7103,
    "todayDeaths": 2,
    "recovered": 109626,
    "todayRecovered": 0,
    "active": 36278, */}

      < div className="app__stats">

      <InfoBox 
      active={casesType === "cases"}
      onClick={ (event) => setCasesType("cases")}
      title="new cases" 
      cases={countryInfo.todayCases} 
      total={countryInfo.cases}
      color="red"
      ></InfoBox>
      <InfoBox 
            active={casesType === "recovered"}
            onClick={ (event) => setCasesType("recovered")}
            title="recovered" cases={countryInfo.todayRecovered}
             total={countryInfo.recovered}
             color="green"></InfoBox>
      <InfoBox 
            active={casesType === "deaths"}
            onClick={ (event) => setCasesType("deaths")}
title="deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}
color="red"
></InfoBox>
      </div>

      <Map 
        casesType = {casesType}
        countries={mapCountries} 
        center={mapCenter} 
        zoom={mapZoom}
      >

      </Map>
      <ResourcePanel></ResourcePanel>
      </div>

      <div className="app__right">
      <Card >
            <CardContent>
              <h2>Live cases by country</h2>
              <Table countries={tableData}></Table>
              <LineGraph casesType={casesType} ></LineGraph>
            </CardContent>
        </Card>          
        {/* Graph */}

      </div>

    </div>
  );
}

export default App;

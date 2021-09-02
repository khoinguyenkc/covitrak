import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';


const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    },
  };
  


export const sortData = (data) => {

    const sortedData = [ ...data];
    sortedData.sort((a,b) => {

        if ( a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;

}


export const showDataOnMap = (data, casesType = "cases") => {
    // explain radius: square root was random, multiplier also random. it's just guesswork. but idea is there is some kind of pattern, more cases = biger radius =  bigger circles
    
    return (
        data.map( country => { 

            return (
                <Circle 
                    center={[country.countryInfo.lat, country.countryInfo.long]}
                    fillOpacity={0.4}
                    color={casesTypeColors[casesType].hex}
                    radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
                >

                    <Popup>
                        <h2>This is a popup</h2>
                    </Popup>

                </Circle>
            )

        })
    )
}